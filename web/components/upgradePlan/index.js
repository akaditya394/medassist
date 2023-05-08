import styles from "./styles.module.scss";

const yearlyData = [
    { id: "1", text: "Billing will be done once a year" },
    { id: "2", text: "Unlimited access to medassist platform" },
]

const monthlyData = [
    { id: "1", text: "Billing will be done once every month" },
    { id: "2", text: "Unlimited access to medassist platform" },
]

const UpgradePlan = () => {
    return (
        <>
            <h1 className="pageHeading">Upgrade your Plan</h1>
            <h3>Choose your plan:</h3>
            <div className={styles.plansContainer}>
                <div className={styles.flexContainer}>
                    <div className={styles.planContainer}>
                        <div className={styles.mostPopularContainer}>
                            <div className={styles.mostPopularText}>most popular plan</div>
                        </div>
                        <div className={styles.planTextContainer}>
                            <div className={styles.planPrice}>$10<text className={styles.planPriceSubText}>/Month</text></div>
                            <div className={styles.yearlyPrice}>$120/Year</div>
                        </div>
                        <div className={styles.billedText}>billed yearly</div>
                        {yearlyData.map((item, key) => {
                            return (
                                <div className={styles.styledFeature} key={key}>
                                    <div className={styles.featureText}>{`\u2022 ${item.text}`}</div>
                                </div>
                            );
                        })}
                        <div className={styles.styledButton} onClick={() => { }}>
                            <div className={styles.buttonText}>Choose Plan</div>
                        </div>
                    </div>
                </div>
                <div className={styles.flexContainer}>
                    <div className={styles.planContainer}>
                        <div className={styles.planTextContainer}>
                            <div className={styles.planPrice}>$12<text className={styles.planPriceSubText}>/Month</text></div>
                            <div className={styles.yearlyPrice}>$144/Year</div>
                        </div>
                        <div className={styles.billedText}>billed monthly</div>
                        {monthlyData.map((item, key) => {
                            return (
                                <div className={styles.styledFeature} key={key}>
                                    <div className={styles.featureText}>{`\u2022 ${item.text}`}</div>
                                </div>
                            );
                        })}
                        <div className={styles.styledButton} onClick={() => { }}>
                            <div className={styles.buttonText}>Choose Plan</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpgradePlan;
