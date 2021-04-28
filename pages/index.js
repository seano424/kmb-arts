import Head from "next/head";
import styles from "../styles/Home.module.css";
import { getClient } from "../lib/sanity";
import Link from "next/link";

const getUniquePosts = (posts) => {
  const slugs = new Set();
  return posts.filter((post) => {
    if (slugs.has(post.slug)) {
      return false;
    } else {
      slugs.add(post.slug);
      return true;
    }
  });
};

export async function getAllPostsForHome(preview) {
  const results = await getClient(preview).fetch(
    `*[_type == "post"] | order(publishedAt desc)`
  );
  return getUniquePosts(results);
}

export async function getStaticProps() {
  const posts = await getAllPostsForHome();

  return {
    props: {
      posts,
    }, // will be passed to the page component as props
  };
}

export default function Home({ posts }) {
  console.log(posts);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          {posts &&
            posts.map((post) => (
              <Link key={post._id} href={`/artworks/${post.slug.current}`}>
                <div className={styles.card}>
                  <a>
                    <h3>{post.title} &rarr;</h3>
                    <p>
                      Find in-depth information about Next.js features and API.
                    </p>
                  </a>
                </div>
              </Link>
            ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
