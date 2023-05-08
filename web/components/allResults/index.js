import { useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";

import Notice from "../notice"

import styles from "./styles.module.scss";
import VerifiedIcon from "../../images/icons/verified.svg";
import UnverifiedIcon from "../../images/icons/hourglass.svg";

const data = [
  { id: 1, name: "my prescription", verified: true },
  { id: 2, name: "test prescription", verified: false },
  { id: 3, name: "Item 2", verified: false },
  { id: 4, name: "Item 3", verified: true },
  { id: 4, name: "Item 3", verified: true },
];

const AllResultsPage = () => {
  const RESET_NOTICE = { type: "", message: "" };
  const [notice, setNotice] = useState(RESET_NOTICE);
  const router = useRouter();

  const handleUpgradePlan = (e) => {
    e.preventDefault();
    router.push("/upgradePlan");
  };

  return (
    <>
      <h1 className="pageHeading">All your results</h1>
      <div className={styles.gridContainer}>
        {data.map((data, key) => {
          return (
            <NextLink
              href={data.verified ? `/verifiedResult` : `unverfiedResult`}
              key={key}
            >
              <div className={styles.box}>
                <div className={styles.name}>{data.name}</div>
                {data.verified && (
                  <div className={styles.verified}>
                    <img src={VerifiedIcon} alt="Verified Icon" />
                  </div>
                )}
              </div>
            </NextLink>
          );
        })}
      </div>
      {data.length >= 5 ? (
        <Notice style={{ marginTop: '2rem' }}>
          <h3>Your free tier has been expired</h3>
          <p>To continue using medassist, upgrade your plan</p>
          <div className={styles.buttonContainer} onClick={handleUpgradePlan}>
            <button className={styles.button}>
              Upgrade Plan
            </button>
          </div>
        </Notice>
      ) : (
        <div className={styles.buttonContainer}>
          <button className={styles.button}>
            Upload Prescription
          </button>
        </div>
      )}

    </>
  );
};

export default AllResultsPage;
