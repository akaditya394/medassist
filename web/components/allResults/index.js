import { useEffect, useState, useContext } from "react";
import NextLink from "next/link";

import StateContext from "../../Context/StateContext";
import styles from "./styles.module.scss";
import VerifiedIcon from "../../images/icons/verified.svg";
import UnverifiedIcon from "../../images/icons/hourglass.svg";
import axios from "axios";

// const data = [
//   { id: 1, name: "my prescription", verified: true },
//   { id: 2, name: "test prescription", verified: false },
//   { id: 3, name: "Item 2", verified: false },
//   { id: 4, name: "Item 3", verified: true },
// ];

const AllResultsPage = () => {
  const RESET_NOTICE = { type: "", message: "" };
  const [notice, setNotice] = useState(RESET_NOTICE);
  const [data, setData] = useState([]);
  const appState = useContext(StateContext);

  useEffect(() => {
    async function prescriptions() {
      try {
        const token = appState.person.token;
        const res = await axios.get("/prescription/allPrescriptions", {
          headers: {
            "Content-Type": "multipart/form-data",
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
    prescriptions();
  }, []);

  return (
    <>
      <h1 className="pageHeading">All your results</h1>
      <div className={styles.gridContainer}>
        {data.map((data, key) => {
          return (
            <NextLink
              href={
                data.isVerified
                  ? {
                      pathname: `/verifiedResult`,
                      query: { id: `${data._id}` },
                    }
                  : {
                      pathname: `/unverifiedResult`,
                      query: { id: `${data._id}` },
                    }
              }
              key={key}
            >
              <div className={styles.box}>
                <div className={styles.name}>{data.name}</div>
                {data.isVerified ? (
                  <div className={styles.verified}>
                    <img src={VerifiedIcon} alt="Verified Icon" />
                  </div>
                ) : (
                  <div className={styles.verified}>
                    <img src={UnverifiedIcon} alt="Unverified Icon" />
                  </div>
                )}
              </div>
            </NextLink>
          );
        })}
      </div>
    </>
  );
};

export default AllResultsPage;
