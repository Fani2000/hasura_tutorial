// import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";

export default async function Home() {
  const res = await getData();
  const friends = res.data.friend;

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div>Welcome</div>
      {/* <div>{JSON.stringify(friends.data.friend[0])}</div> */}
      {friends.map((friend: any) => {
        return <div key={friend.id}>{friend.name}</div>;
      })}
    </main>
  );
}

// export const getServerSideProps: GetServerSideProps = async (context) => {};

const getData = async () => {
  // console.log(process.env)
  let data = await fetch(process.env.HASURA_URL as string, {
    headers: {
      "x-hasura-admin-secret": process.env
        .HASURA_GRAPHQL_ADMIN_SECRET as string,
    },
    method: "POST",
    body: JSON.stringify({
      query: `query {
          friend {
            name
            id
          }
        }`,
    }),
  });

  return await data.json();
};
