import Link from "next/link"


export default function MobileNavLinks(){

    const links = [
        {
            name: 'Home',
            href: '/',
        },
        {
            name: 'Posts',
            href: '/Posts',
        },
        {
            name: 'About',
            href: '/About'
        }
    ]

    return(
    <ul className="h-full place-content-center items-center justify-center">
        {links.map((link) =>{
            return(
            <li 
                key={link.name}
                className="pb-6 mt-2 text-xl text-center items-center justify-center text-white">
                <Link
                    key={link.name}
                    href={link.href}
                    className="items-center justify-center block w-full h-auto bg-transparent active:bg-gray-700 transition-all active:border-blue-900 border-b-2 py-2"
                >
                    {link.name}
                </Link>
            </li>                
            )
        })}

    </ul>
    )
}
