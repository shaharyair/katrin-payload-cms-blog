import type { Metadata } from "next/types";

import { CardPostData } from "@/components/Card";
import { CollectionArchive } from "@/components/CollectionArchive";
import { Search } from "@/search/Component";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import PageClient from "./page.client";

type Args = {
  searchParams: Promise<{
    q: string;
  }>;
};
export default async function Page({
  searchParams: searchParamsPromise,
}: Args) {
  const { q: query } = await searchParamsPromise;
  const payload = await getPayload({ config: configPromise });

  const posts = await payload.find({
    collection: "posts",
    depth: 1,
    limit: 12,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
    // pagination: false reduces overhead if you don't need totalDocs
    pagination: false,
    ...(query
      ? {
          where: {
            or: [
              {
                title: {
                  like: query,
                },
              },
              {
                "meta.description": {
                  like: query,
                },
              },
              {
                "meta.title": {
                  like: query,
                },
              },
              {
                slug: {
                  like: query,
                },
              },
              {
                "categories.title": {
                  like: query,
                },
              },
            ],
          },
        }
      : {}),
  });

  return (
    <div className="pb-24 pt-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose max-w-none text-center dark:prose-invert">
          <h1 className="mb-8 lg:mb-16">המתכונים של קאתרין</h1>

          <div className="mx-auto max-w-[50rem]">
            <Search />
          </div>
        </div>
      </div>

      {posts.totalDocs > 0 ? (
        <CollectionArchive posts={posts.docs as CardPostData[]} />
      ) : (
        <div className="container text-center">לא נמצאו תוצאות</div>
      )}
    </div>
  );
}

export async function generateMetadata({
  searchParams,
}: Args): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q
      ? `המתכונים של קאתרין | חיפוש | ${q}`
      : `המתכונים של קאתרין | חיפוש`,
  };
}
