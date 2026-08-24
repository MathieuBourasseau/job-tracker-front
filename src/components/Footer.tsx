import { FaGithub, FaLinkedin } from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className="max-w-2xl mx-auto flex justify-center gap-6 px-4 py-8 mt-12 border-t border-gray-200 text-gray-500">
            <a
                href="https://github.com/MathieuBourasseau"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-gray-800"
            >
                <FaGithub className="text-xl" />
                GitHub
            </a>
            <a
                href="https://www.linkedin.com/in/mathieu-bourasseau"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-gray-800"
            >
                <FaLinkedin className="text-xl" />
                LinkedIn
            </a>
        </footer>
    )
}
