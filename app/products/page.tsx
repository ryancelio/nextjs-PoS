import { Button, Link } from "@nextui-org/react";


export default function ProductsPage() {

    return (
        <section className="grid place-items-center w-full h-full">
            <Button as={Link} href="/products/addProduct">
                Adicionar Mercadoria
            </Button>
        </section>
    )
}