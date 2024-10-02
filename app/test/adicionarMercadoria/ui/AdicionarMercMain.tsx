'use client';
import { Autocomplete, AutocompleteItem, Button, DatePicker, Divider, Input, Textarea } from "@nextui-org/react";
import ConfirmationOver from "@/app/ui/components/ConfirmationOver";
import { useActionState, useState } from "react";
import {getLocalTimeZone, today, DateValue} from '@internationalized/date'
import { useRouter } from "next/navigation";
import { EstoqueInput } from "./EstoqueInput";
import { Categoria,Fabrica, Grupo } from "@/app/lib/types";
import { useFormStatus } from "react-dom";
import { addFormMerc } from "../addFormMerc";
import { TempModal } from "@/app/ui/components/TempMessage";
import { toInternational } from "@/app/lib/internationalization";


const initialState = {
    message: "",
}

export default function AdicionarMercMain({categorias,fabricas,grupos}:
    {
        categorias: Categoria[],
        fabricas: Fabrica[],
        grupos: Grupo[],
    },
){
    const router = useRouter()
    const [isConfirmationOpen,setConfirmationOpen] = useState(false);
    interface EstoqueValues {
        estoque02: number,
        estoque03: number,
        estoque04: number,
    }

    const [estoqueValues,setEstoqueValues] = useState<EstoqueValues>({
        estoque02: 0, 
        estoque03: 0,
        estoque04: 0,
    });
    const [sumEstoques,setSumEstoques] = useState(0);
    const [dateUltimaEntrada, setDateUltimaEntrada] = useState<DateValue>(today(getLocalTimeZone()));
    const [fabricaValue,setFabricaValue] = useState<React.Key>("");
    const [state, mercFormAction] = useActionState(addFormMerc, initialState);
    const [fabricaSelectTouched,setFabricaSelectTouched] = useState(false)
    const [valorCompra,setValorCompra] = useState("");
    const [valorVenda,setValorVenda] = useState("");
    const [warningVisible,setWarningVisible] = useState(false);
    const [warningOpacity,setWarningOpacity] = useState(0);

    const {pending} = useFormStatus();

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        setEstoqueValues({
          ...estoqueValues,
          [event.target.name]: Number(event.target.value),
        });
        console.log(estoqueValues)
    };

    function getSomaEstoques(){
        setSumEstoques(Object.values(estoqueValues).reduce((sum,value) => sum + parseInt(value || 0),0));
    }

    const submitAction = (formData: FormData) =>{
        setFabricaSelectTouched(false);
        setSumEstoques(0);
        mercFormAction(formData)
    }

    return(
        <section className="h-full w-full">
        <div className={isConfirmationOpen? "block" : "hidden"}>
            <ConfirmationOver   title="Sair?" desc="Todas as alterações serão perdidas." 
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
                //@ts-ignore
                action={(FormData: FormData) => submitAction(FormData)}        
        >
            <div className="p-10 grid grid-cols-12 place-items-center gap-10 justify-center items-center">
                <Textarea 
                label="Descricao"
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
                <Autocomplete   variant="bordered" isRequired
                                validationBehavior="aria"
                                labelPlacement="outside" label="Fábrica"
                                className="px-2 col-span-2" size="lg" name="fabrica" id="fabrica"
                                isInvalid={Boolean(fabricaValue) || !fabricaSelectTouched ? false : true}
                                errorMessage={Boolean(fabricaValue) || !fabricaSelectTouched ? "" : "Selecione uma fábrica."}
                                onClose={() => setFabricaSelectTouched(true)}
                                //@ts-ignore
                                selectedKey={fabricaValue}
                                //@ts-ignore
                                onSelectionChange={setFabricaValue}
                                >
                    {fabricas.map((fabrica) =>(
                        <AutocompleteItem key={fabrica.fabrica_key} value={fabrica.label} >
                            {fabrica.nomeFantasia}
                        </AutocompleteItem>
                    ))}
                </Autocomplete>
                {/* Categoria */}
                <Autocomplete variant="faded" label="Categoria" className="px-2 col-span-2" size="md">
                    {categorias.map((categoria) =>(
                        <AutocompleteItem key={categoria.categoria_key} value={categoria.name}>
                            {categoria.name}
                        </AutocompleteItem>
                    ))}
                </Autocomplete>
                {/* Grupo */}
                <Autocomplete variant="faded" label="Grupo" className="col-span-2" size="md">
                    {grupos.map((grupo) =>(
                        <AutocompleteItem key={grupo.grupo_key} value={grupo.label}>
                            {grupo.name}
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
                                <EstoqueInput   label="Loja 02" id="estoque02" 
                                                getSumEstoque={getSomaEstoques}
                                                setEstoqueValues={handleInputChange} estoqueValues={estoqueValues}/>
                            </div>
                            <div className="mb-12">
                                <EstoqueInput   label="Loja 03" id="estoque03" 
                                                getSumEstoque={getSomaEstoques} 
                                                setEstoqueValues={handleInputChange} estoqueValues={estoqueValues}/>
                            </div>
                            <div className="mb-12">
                                <EstoqueInput   label="Loja 04" id="estoque04"
                                                getSumEstoque={getSomaEstoques} 
                                                setEstoqueValues={handleInputChange} estoqueValues={estoqueValues}/>
                            </div>
                        </div>
                        <Divider />
                        <div className="ml-4 mt-4">
                            <EstoqueInput   label="Total" id="total"
                                            setEstoqueValues={handleInputChange}
                                            estoqueValues={estoqueValues} value={sumEstoques} isReadOnly={true}/>
                        </div>
                        {/* <Button onPress={getSomaEstoques}>ASLKJD</Button> */}
                    </div>
                    {/* Datas */}
                    <Divider orientation="vertical" className="h-full w-2 bg-red-500 text-blue-500"/>
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
                                <Input  type="text" label="Valor Compra" labelPlacement="outside" 
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
                                
                                    return setValorCompra(Number(valor).toLocaleString("pt-BR", { minimumFractionDigits: 2,maximumFractionDigits: 2}));
                                }}
                                className="w-full"
                                classNames={{
                                    input: `text-lg text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none
                                            [&::-webkit-inner-spin-button]:appearance-none`,
                                }}
                                />
                            </div>

                            <div className="mt-5">
                                <Input  type="text" label="Valor Venda" labelPlacement="outside" 
                                startContent="R$"
                                size="md"
                                lang="pt-BR"
                                value={valorVenda}
                                onValueChange={setValorVenda}
                                placeholder="0,00"
                                step={"any"}
                                name="valorCompra"
                                onBlur={() => {
                                    let valor = toInternational(valorVenda);

                                    return setValorVenda(Number(valor).toLocaleString("pt-BR", { minimumFractionDigits: 2,maximumFractionDigits: 2}));
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
            </div>
            


            {/* Submit Button */}
            <div className="mt-auto mb-0 flex gap-52 justify-center w-fit ml-auto mr-36">
                <Button color="danger" onPress={() => setConfirmationOpen(!isConfirmationOpen)}>
                    Cancelar
                </Button>
                <Button type="submit" color="success" isDisabled={pending} aria-disabled={pending}>
                    Salvar
                </Button>
            </div>
            <Button onPress={() => {
                    setWarningOpacity(100);
                    setWarningVisible(true);
                }}>
                                Visible
            </Button>
            <div className="fixed bottom-5 w-full flex justify-center">
                <TempModal isVisible={warningVisible} value={warningOpacity} setValue={setWarningOpacity} setVisible={setWarningVisible}/>
            </div>
    </form>
    </section>
    )

    
}
