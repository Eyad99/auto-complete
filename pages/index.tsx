import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import AutoComplete from "../component/AutoComplete";
import { Country } from "../models";

const Home: NextPage = () => {
  const [data, setData] = useState<Country[]>([
    { name: "Syria" },
    { name: "Brazil" },
    { name: "Japan" },
    { name: "Russia" },
    { name: "Mexico" },
    { name: "Canada" },
    { name: "Egypt" },
    { name: "Spain" },
    { name: "Germany" },
    { name: "Turkey" },
    { name: "Australia" },
    { name: "Argentina" },
    { name: "Italy" },
  ]);

  /* we can use this for load data using a read API call to some resource.*/

  // useEffect(() => {
  /* we can use fake Api (jsonplaceholder) or json server or  any other source that corresponds to the data format */
  //   fetch("https://jsonplaceholder.typicode.com/users")
  //     .then((response) => response.json())
  //     .then((json) => setData(json));
  // }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Auto Complete Component</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <AutoComplete data={data} />
      </main>
    </div>
  );
};

export default Home;
