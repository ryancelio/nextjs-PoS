'use client';
import { Autocomplete, AutocompleteItem, Button, DatePicker, Divider, Input, Textarea } from "@nextui-org/react";
import ConfirmationOver from "@/app/ui/components/ConfirmationOver";
import { Key, useActionState, useState } from "react";
import { getLocalTimeZone, today, DateValue } from '@internationalized/date'
import { useRouter } from "next/navigation";
import { EstoqueInput } from "./EstoqueInput";
import { Categoria, Fabrica, Grupo } from "@/app/lib/types";
import { addFormMerc } from "../addMercAction";
import { TempModal } from "@/app/ui/components/TempMessage";
import { toInternational } from "@/app/lib/internationalization";


const initialState = {
    message: "",
}

export default function AdicionarMercMain({ categorias, fabricas, grupos }:
    {
        categorias: Categoria[],
        fabricas: Fabrica[],
        grupos: Grupo[],
    },
) {
    const router = useRouter()
    // Confirmation Modal
    const [isConfirmationOpen, setConfirmationOpen] = useState(false);

    // Cod
    const [cod, setCod] = useState("0");
    const [canEditCode, setCanEditCode] = useState(false)

    // Estoque
    const [estoque02, setEstoque02] = useState(0);
    const [estoque03, setEstoque03] = useState(0);
    const [estoque04, setEstoque04] = useState(0);
    const [estoqueTotal, setEstoqueTotal] = useState(0);
    // const [sumEstoques,setSumEstoques] = useState(0);

    //Datas
    const [dateUltimaEntrada, setDateUltimaEntrada] = useState<DateValue>(today(getLocalTimeZone()));

    //Form
    const [message, mercFormAction, isPending] = useActionState(addFormMerc, initialState);
    // const { pending } = useFormStatus();

    // Fábrica
    const [fabricaValue, setFabricaValue] = useState<Key>("");
    const [fabricaSelectTouched, setFabricaSelectTouched] = useState(false);

    // Categoria
    const [categoriaValue, setCategoriaValue] = useState<Key>("");
    const [categoriaTouched, setCategoriaTouched] = useState(false);

    //Grupo
    const [grupoValue, setGrupoValue] = useState<Key>("");
    const [grupoTouched, setGrupoTouch] = useState(false);

    // Valores
    const [valorCompra, setValorCompra] = useState("");
    const [valorVenda, setValorVenda] = useState("");

    // Warning Modal
    const [warningVisible, setWarningVisible] = useState(false);
    const [warningOpacity, setWarningOpacity] = useState(0);


    function getSomaEstoques(value: number) {
        setEstoqueTotal((prev) => (prev + value))
    }

    const submitAction = (formData: FormData) => {

        //Get Fabrica key
        formData.set('fabricaKey', fabricaValue ? fabricaValue.toString() : "");
        formData.set('categoriaKey', categoriaValue ? categoriaValue.toString() : "");
        formData.set("grupoKey", grupoValue ? grupoValue.toString() : "");


        // Send Form
        mercFormAction(formData);
    }

    const submitButonPress = () => {
        // Reset Fabrica input error
        setFabricaSelectTouched(false);
        setCategoriaTouched(false);
        setGrupoTouch(false);

        // Reset Estoque Values and Sum
        setEstoque02(0);
        setEstoque03(0);
        setEstoque04(0);
        setEstoqueTotal(0);

        // Warning Modal
        setWarningVisible(true);
        setWarningOpacity(3);
    }

    return (
        <section className="h-full w-full">
            <div className={isConfirmationOpen ? "block" : "hidden"}>
                <ConfirmationOver title="Sair?" desc="Todas as alterações serão perdidas."
                    ConfirmText="Continuar" ConfirmAction={() => setConfirmationOpen(!isConfirmationOpen)}
                    CancelText="Sair" CancelAction={() => router.push('/test')}
                />
            </div>

            {/* 
        ||=========================||
        ||          FORM           ||
        ||=========================||
        */}
            <form className="flex-col flex h-full"
                action={(FormData: FormData) => submitAction(FormData)}
            >
                <div className="p-10 grid grid-cols-12 gap-10 justify-center items-center">
                    <div className="col-span-12 w-full">
                        <Input className="mr-auto w-24" type="number" label={"COD"} labelPlacement="outside" placeholder="0"
                            value={cod} onValueChange={setCod} variant={canEditCode ? "bordered" : "faded"}
                            isReadOnly={canEditCode} name="cod"
                            classNames={{
                                input: `text-center text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
                                                 [&::-webkit-inner-spin-button]:appearance-none`,
                                label: "text-center w-full",
                            }}
                        />

                    </div>
                    <Textarea
                        label="Descrição"
                        name="descricao"
                        id="descricao"
                        labelPlacement="outside"
                        placeholder="Nome da Mercadoria"
                        minRows={1} maxRows={2}
                        size="lg"
                        variant="underlined"
                        className="col-span-4"
                        classNames={{
                            input: "text-xl",
                            label: 'text-md'
                        }}
                    />
                    <Textarea
                        label="Cor"
                        labelPlacement="outside"
                        name="cor"
                        id="cor"
                        placeholder="Cor"
                        minRows={1} maxRows={1}
                        size="lg"
                        variant="underlined"
                        className="col-span-2"
                    />
                    {/* FABRICA */}
                    <Autocomplete variant="bordered" isRequired
                        validationBehavior="aria"
                        description="Selecione uma Fábrica"
                        labelPlacement="outside" label="Fábrica"
                        className="col-span-2" size="lg" name="fabrica" id="fabrica"
                        isInvalid={Boolean(fabricaValue) || !fabricaSelectTouched ? false : true}
                        errorMessage={Boolean(fabricaValue) || !fabricaSelectTouched ? "" : "Selecione uma Fábrica Válida!"}
                        onClose={() => setFabricaSelectTouched(true)}
                        //@ts-ignore
                        selectedKey={fabricaValue} onSelectionChange={setFabricaValue}
                    >
                        {fabricas.map((fabrica) => (
                            <AutocompleteItem key={fabrica.fabrica_key} value={fabrica.label} >
                                {fabrica.nomeFantasia}
                            </AutocompleteItem>
                        ))}
                    </Autocomplete>
                    
                    {/* Grupo */}
                    <Autocomplete variant="bordered" label="Grupo" className="col-span-2" size="lg" name="grupo"
                        validationBehavior="aria" labelPlacement="outside" description="Selecione um Grupo"
                        isRequired
                        //@ts-ignore
                        selectedKey={grupoValue} onSelectionChange={setGrupoValue}
                        isInvalid={Boolean(grupoValue) || !grupoTouched ? false : true}
                        errorMessage={Boolean(grupoValue) || !grupoTouched ? "" : "Selecione um Grupo Válido!"}
                        onClose={() => setGrupoTouch(true)}
                    >
                        {grupos.map((grupo) => (
                            <AutocompleteItem key={grupo.grupo_key} value={grupo.label}>
                                {grupo.name}
                            </AutocompleteItem>
                        ))}
                    </Autocomplete>
                    {/* Categoria */}
                    <Autocomplete variant="bordered" label="Categoria" className="col-span-2" size="lg" name="categoria"
                        validationBehavior="aria" labelPlacement="outside" description="Selecione uma Categoria"
                        isRequired
                        isInvalid={Boolean(categoriaValue) || !categoriaTouched ? false : true}
                        errorMessage={Boolean(categoriaValue) || !categoriaTouched ? "" : "Selecione uma Categoria Válida!"}
                        onClose={() => setCategoriaTouched(true)}
                        //@ts-ignore
                        selectedKey={categoriaValue} onSelectionChange={setCategoriaValue}
                    >
                        {categorias.map((categoria) => (
                            <AutocompleteItem key={categoria.categoria_key} value={categoria.name}>
                                {categoria.name}
                            </AutocompleteItem>
                        ))}
                    </Autocomplete>
                    {/* Flex COL for Relative element constant size */}
                    <div className="col-span-12 w-full flex">
                        {/* Estoque */}
                        <div className="w-56 mr-10">
                            <h2 className="text-lg mb-2 font-bold w-full text-center">Estoque</h2>
                            <div className="flex flex-col mb-2 ml-4">
                                <div className="mb-12">
                                    <EstoqueInput label="Loja 02" id="estoque02"
                                        onBlur={getSomaEstoques}
                                        setEstoqueValues={setEstoque02} value={estoque02} />
                                </div>
                                <div className="mb-12">
                                    <EstoqueInput label="Loja 03" id="estoque03"
                                        onBlur={getSomaEstoques}
                                        setEstoqueValues={setEstoque03} value={estoque03} />
                                </div>
                                <div className="mb-12">
                                    <EstoqueInput label="Loja 04" id="estoque04"
                                        onBlur={getSomaEstoques}
                                        setEstoqueValues={setEstoque04} value={estoque04} />
                                </div>
                            </div>
                            <Divider />
                            <div className="ml-4 mt-4">
                                <EstoqueInput label="Total" id="total"
                                    setEstoqueValues={setEstoqueTotal}
                                    value={estoqueTotal} isReadOnly />
                            </div>
                            {/* <Button onPress={getSomaEstoques}>ASLKJD</Button> */}
                        </div>
                        {/* Datas */}
                        <div className="text-center items-start max-w-fit">
                            <h1 className="text-lg font-bold">
                                Datas
                            </h1>
                            <DatePicker
                                label="Ultima Entrada"
                                labelPlacement="outside"
                                size="lg"
                                name="ultimaEntrada"
                                // defaultValue={today(getLocalTimeZone())}
                                value={dateUltimaEntrada}
                                onChange={setDateUltimaEntrada}
                                maxValue={today(getLocalTimeZone())}
                                granularity="day"
                                className="mb-3 text-start"
                            />
                            <DatePicker
                                label="Ultima Saída"
                                labelPlacement="outside"
                                size="lg"
                                name="ultimaSaida"
                                // defaultValue={today(getLocalTimeZone())}
                                // value={dateUltimaEntrada}
                                // onChange={setDateUltimaEntrada}
                                maxValue={today(getLocalTimeZone())}
                                isDisabled
                                granularity="day"
                                className="text-start"
                            />
                        </div>
                        {/* Preços */}
                        <div className="ml-auto mr-5">
                            <div className="w-52">
                                <h1 className="text-center text-lg font-bold mb-5">
                                    Preços
                                </h1>
                                <div className="pb-4">
                                    <Input type="text" label="Valor Compra" labelPlacement="outside"
                                        startContent="R$"
                                        size="md"
                                        lang="pt-BR"
                                        value={valorCompra}
                                        onValueChange={setValorCompra}
                                        placeholder="0,00"
                                        step={"any"}
                                        name="valorCompra"
                                        onBlur={() => {
                                            let valor = toInternational(valorCompra);

                                            return setValorCompra(Number(valor).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                                        }}
                                        className="w-full"
                                        classNames={{
                                            input: `text-lg text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none
                                            [&::-webkit-inner-spin-button]:appearance-none`,
                                        }}
                                    />
                                </div>

                                <div className="mt-5">
                                    <Input type="text" label="Valor Venda" labelPlacement="outside"
                                        startContent="R$"
                                        size="md"
                                        lang="pt-BR"
                                        value={valorVenda}
                                        onValueChange={setValorVenda}
                                        placeholder="0,00"
                                        step={"any"}
                                        name="valorVenda"
                                        onBlur={() => {
                                            let valor = toInternational(valorVenda);

                                            return setValorVenda(Number(valor).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                                        }}
                                        className="w-full mt-10"
                                        classNames={{
                                            input: `text-lg text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none
                                            [&::-webkit-inner-spin-button]:appearance-none`,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* Obs */}
                    <div className="col-span-12 mt-20 mx-5 h-full">
                        <Textarea
                            size="lg" name="obs"
                            label="Observações:" labelPlacement="inside" className="w-ful h-full"
                            variant="bordered"
                        />
                    </div>
                </div>



                {/* Submit Button */}
                <div className="mt-auto mb-0 flex gap-52 justify-center w-fit ml-auto mr-36">
                    <Button color="danger" onPress={() => setConfirmationOpen(!isConfirmationOpen)}>
                        Cancelar
                    </Button>
                    <Button type="submit" className="w-fit" onPress={() => submitButonPress()} color="success" isLoading={isPending} isDisabled={isPending}>
                        Salvar
                    </Button>
                </div>
                <div>
                </div>
                <div className="fixed bottom-5 left-1/2 -translate-x-1/2 flex justify-center">
                    <TempModal
                        isVisible={warningVisible} setVisible={setWarningVisible}
                        value={warningOpacity} setValue={setWarningOpacity}
                        title="Error" isPending={isPending}
                        description={message.message}
                    />
                </div>
            </form>
        </section>
    )


}
