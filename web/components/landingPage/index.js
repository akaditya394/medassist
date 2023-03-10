import styles from "./styles.module.scss"

import LoginPageIllustration from "../../images/login_page_illustration.svg"

const LandingPage = () => {
    return (
        <div className="ContentContainer">
            <div className={styles.landingPage}>
                Hello
            </div>
            <div className="ContentPageIllustration">
                <img src={LoginPageIllustration} alt="" />
            </div>
        </div>
    )
}

export default LandingPage