import { useState, useContext, useEffect } from "react";
import NextLink from "next/link";
import axios from "axios";

import StateContext from "../../Context/StateContext";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import LoaderDarkBig from "../loaderDarkBig";

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
  const [isLoading, setIsLoading] = useState(false);
  const appState = useContext(StateContext);

  useEffect(() => {
    async function unverifiedPrescriptions() {
      try {
        const token = appState.person.token;
        setIsLoading(true);
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
            setIsLoading(false);
            setData(res.data.prescriptions);
            break;
          case "error":
            setIsLoading(false);
            console.log(res);
            break;
        }
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    }
    unverifiedPrescriptions();
  }, []);

  return (
    <>
      <h1 className="pageHeading">All your unverified prescriptions</h1>
      {!isLoading ? (
        <div className={styles.gridContainer}>
          {data.map((data, key) => {
            return (
              <NextLink href={`/prescriptions/${data?._id}`} key={key}>
                <div className={styles.box}>{data.name}</div>
              </NextLink>
            );
          })}
        </div>
      ) : (
        <div className={styles.loader}>
          <LoaderDarkBig />
        </div>
      )}
    </>
  );
};

export default AllPrescriptionsPage;
