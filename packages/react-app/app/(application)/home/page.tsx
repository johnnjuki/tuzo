"use client";

import Link from "next/link";
import { useReadContract, useAccount } from "wagmi";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GiftIcon } from "lucide-react";
import { tuzoAbi } from "@/blockchain/abi/tuzo-abi";

export default function HomePage() {
  const { address, isConnected } = useAccount();

  const {
    data: programs,
    isPending,
    error,
  } = useReadContract({
    address: "0x2BAeeBf78342c84de0833b605beaFC94A1DC4b99",
    abi: tuzoAbi,
    functionName: "getAllPrograms",
  });

  return (
    <main className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Tuzo</h1>
        <p className="text-sm text-muted-foreground">
          Earn and redeem points to unlock exclusive rewards
        </p>
      </div>

      <Link href="/my-programs/programs/create">
        {" "}
        <Button className="w-full">Create Rewards Program</Button>
      </Link>

      <div className="mt-2 text-xl font-semibold">Available Programs</div>

      {!isConnected ? (
        <div className="">
          <p>Connect your wallet to see programs</p>
        </div>
      ) : (
        <>
          {error && (
            <div className="">
              <p>
                Error fetching programs. Check your internet connection or try
                again later.
              </p>
            </div>
          )}

          {isPending ? (
            <Skeleton className="h-[350px] w-[350px] rounded-xl" />
          ) : (
            <>
              {programs?.length === 0 && (
                <div className="">
                  <p className="text-muted-foreground">
                    No rewards programs found
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 gap-6">
                {programs?.map((program, index) => (
                  <Card key={index}>
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <GiftIcon className="mb-2 h-8 w-8 text-muted-foreground" />
                      <h3 className="mb-1 text-lg font-bold">{program.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {program.description}
                      </p>
                      <Link
                        href={
                          address === program.owner
                            ? `/my-programs/programs/${program.programId}/points`
                            : `/program/${program.owner}/${program.programId}`
                        }
                        key={index}
                      >
                        <Button variant="outline" className="mt-4">
                          {address === program.owner ? "Edit" : "Join Now"}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </main>
  );
}
