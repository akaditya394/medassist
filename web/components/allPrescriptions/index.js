import { useState, useContext, useEffect } from "react";
import NextLink from "next/link";
import axios from "axios";

import StateContext from "../../Context/StateContext";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";

const data = [
  { id: 1, name: "my prescription" },
  { id: 2, name: "test prescription" },
  { id: 3, name: "Item 3" },
];

const AllPrescriptionsPage = () => {
  const RESET_NOTICE = { type: "", message: "" };
  const [notice, setNotice] = useState(RESET_NOTICE);
  const router = useRouter();
  const [data, setData] = useState([]);
  const appState = useContext(StateContext);

  useEffect(() => {
    async function unverifiedPrescriptions() {
      try {
        const token = appState.person.token;
        // if (!token) {
        //   router.replace("/login");
        // }
        const res = await axios.get("/doctor/unverifiedPrescriptions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        switch (res.data.type) {
          case "success":
            setData(res.data.prescriptions);
            break;
          case "error":
            console.log(res);
            break;
        }
        // console.log(res, "ResPres");
        // setData([
        //   { id: 1, name: "my prescription", verified: true },
        //   { id: 2, name: "test prescription", verified: false },
        //   { id: 3, name: "Item 2", verified: false },
        //   { id: 4, name: "Item 3", verified: true },
        // ]);
      } catch (err) {
        console.log(err);
      }
    }
    unverifiedPrescriptions();
  }, []);

  return (
    <>
      <h1 className="pageHeading">All your unverified prescriptions</h1>
      <div className={styles.gridContainer}>
        {data.map((data, key) => {
          return (
            <NextLink href={`/prescriptions/1`} key={key}>
              <div className={styles.box}>{data.name}</div>
            </NextLink>
          );
        })}
      </div>
    </>
  );
};

export default AllPrescriptionsPage;
