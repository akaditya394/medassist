import styles from "./styles.module.scss"
import { useRouter } from "next/router"

import LoginPageIllustration from "../../images/login_page_illustration.svg"

const LandingPage = () => {
    const router = useRouter()

    return (
        <div className="ContentContainer">
            <div className={styles.landingPage}>
                <h1 className="pageHeading">
                    A Simple way to help regulate your health
                </h1>
                <h3 style={{ marginBottom: '15px' }}>
                    • Upload prescriptions to see side-effects and alternatives to drugs
                </h3>
                <h3 style={{ marginBottom: '15px' }}>
                    • View personalized health chart according to your medical history
                </h3>
                <h3>
                    • One to one consultation with trained medical history
                </h3>
                <button className={styles.button} onClick={() => router.push("/signup")}>
                    Get Started
                </button>
            </div>
            <div className="ContentPageIllustration">
                <img src={LoginPageIllustration} alt="" />
            </div>
        </div>
    )
}

export default LandingPage