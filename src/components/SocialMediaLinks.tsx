import GitHubIcon from "@/icons/GitHub.svg";
import LinkedInIcon from "@/icons/LinkedIn.svg";
import MailIcon from "@/icons/Mail.svg";
import TelegramIcon from "@/icons/Telegram.svg";
import XIcon from "@/icons/X.svg";

function SocialMediaLinks() {
    return (
        <div className="flex flex-row gap-10 justify-center items-center h-10">
            <a href="https://linkedin.com/in/notrithik" target="_blank">
                <LinkedInIcon className="h-10" />
            </a>
            <a href="https://github.com/notrithik" target="_blank">
                <GitHubIcon className="h-10" />
            </a>
            <a href="https://t.me/notrithik" target="_blank">
                <TelegramIcon className="h-10" />
            </a>
            <a href="mailto:rithikum123@gmail.com" target="_blank">
                <MailIcon className="h-10" />
            </a>
            <a href="https://x.com/proof_of_mind" target="_blank">
                <XIcon className="h-10" />
            </a>
        </div>
    )
}

export default SocialMediaLinks;