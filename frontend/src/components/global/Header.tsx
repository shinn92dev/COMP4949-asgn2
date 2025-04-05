import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { UserButton, SignOutButton } from "@clerk/clerk-react";
import logo from "@/src/assets/logo.png";
import logo_text from "@/src/assets/logo_text.png";
import { Button } from "@/components/ui/button";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = ["Dashboard", "Diary"];
    const title = "Moodiary";
    return (
        <header className="w-full max-w-6xl px-4 py-3 shadow-md bg-white fixed top-0 z-50">
            <div className="flex justify-between items-center">
                {/* Logo / App name */}
                <motion.h1
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-xl font-bold text-gray-800 ml-5 flex gap-x-5"
                >
                    <div className="flex gap-x-3 items-center h-fit ">
                        <img src={logo} alt="logo" className="w-7" />
                        <h1 className="pb-1">{title}</h1>
                    </div>
                </motion.h1>

                {/* Nav: Desktop */}
                <nav className="hidden md:flex gap-6 items-center">
                    {navItems.map((item, idx) => (
                        <motion.a
                            key={item}
                            href={`/${item.toLowerCase()}`}
                            className="text-gray-600 hover:text-blue-500 font-medium"
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 * idx }}
                        >
                            {item}
                        </motion.a>
                    ))}

                    {/* User Icon */}

                    <motion.div
                        className="w-8 h-8 bg-gray-300 rounded-full"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <UserButton />
                    </motion.div>
                </nav>

                {/* Nav: Mobile */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Sliding Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-40 px-6 py-4"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-xl font-bold text-gray-800">Menu</span>
                            <button onClick={() => setIsOpen(false)}>
                                <X size={24} />
                            </button>
                        </div>
                        <div className="w-64 justify-center">
                            <img src={logo_text} alt="logo" className="w-50" />
                        </div>
                        <ul className="flex flex-col gap-4">
                            {navItems.map((item) => (
                                <li key={item}>
                                    <a
                                        href={`/${item.toLowerCase()}`}
                                        className="text-gray-700 hover:text-blue-500 text-lg"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <SignOutButton>
                            <Button>Signout</Button>
                        </SignOutButton>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
