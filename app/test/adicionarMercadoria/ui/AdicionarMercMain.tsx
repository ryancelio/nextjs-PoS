'use client';
import { Autocomplete, AutocompleteItem, Button, DateInput, DatePicker, Divider, Textarea } from "@nextui-org/react";
import { addMercAction } from "../../addMercAction";
import ConfirmationOver from "@/app/ui/components/ConfirmationOver";
import { useContext, useState } from "react";
import {getLocalTimeZone, parseAbsoluteToLocal, today, DateValue, now} from '@internationalized/date'
import { useRouter } from "next/navigation";
import { EstoqueInput } from "./EstoqueInput";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { I18nProvider } from "@react-aria/i18n";
import { Mercadoria,Categoria,Fabrica } from "@/app/lib/types";



export default function AdicionarMercMain({categorias,fabricas}:
    {
        categorias: Categoria[],
        fabricas: Fabrica[],
    },
){
    const router = useRouter()
    const [isConfirmationOpen,setConfirmationOpen] = useState(false);
    interface EstoqueValues {
        EstLj02: Number,
        EstLj03: Number,
        EstLj04: Number,
    }

    const [estoqueValues,setEstoqueValues] = useState<EstoqueValues>({EstLj02: 0, EstLj03: 0,EstLj04: 0});
    const [sumEstoques,setSumEstoques] = useState(0);
    const [dateUltimaEntrada, setDateUltimaEntrada] = useState<DateValue>(today(getLocalTimeZone()));
    const [fabricaValue,setFabricaValue] = useState<React.Key>("");

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        setEstoqueValues({
          ...estoqueValues,
          [event.target.name]: event.target.value,
        });
    };

    function getSomaEstoques(){
        console.log(getLocalTimeZone())
        setSumEstoques(Object.values(estoqueValues).reduce((sum,value) => sum + parseInt(value || 0),0));
    }

    // const handleSubmit = (event: any) =>{
    //     const selectedLabel = new FormData(event.target).get("fabrica");
    //     console.log(selectedLabel)
    // }

    return(
        <>
        <div className={isConfirmationOpen? "block" : "hidden"}>
            <ConfirmationOver   title="Sair?" desc="Todas as alterações serão perdidas." 
                                ConfirmText="Continuar" ConfirmAction={() => setConfirmationOpen(!isConfirmationOpen)} 
                                CancelText="Sair" CancelAction={() => router.push('/test')}
                                />
        </div>
        <form className="flex-col flex h-full"
                action={addMercAction}        
        >
            <div className="p-10 grid grid-cols-12 place-items-center gap-10 justify-center items-end">
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
                <Autocomplete   variant="bordered" isRequired
                                labelPlacement="outside" label="Fábrica"
                                className="px-2 col-span-2" size="lg" name="fabrica" id="fabrica"
                                isInvalid={Boolean(!fabricaValue)}
                                //@ts-ignore
                                selectedKey={fabricaValue}
                                //@ts-ignore
                                onSelectionChange={setFabricaValue}
                                >
                    {fabricas.map((fabrica) =>(
                        <AutocompleteItem key={fabrica.key} value={fabrica.label}>
                            {fabrica.nomeFantasia}
                        </AutocompleteItem>
                    ))}
                </Autocomplete>
                <Autocomplete variant="faded" label="Categoria" className="px-2 col-span-2" size="md">
                    {categorias.map((categoria) =>(
                        <AutocompleteItem key={categoria.key} value={categoria.name}>
                            {categoria.name}
                        </AutocompleteItem>
                    ))}
                </Autocomplete>
                <Autocomplete variant="faded" label="Grupo" className="col-span-2" size="md">
                    {categorias.map((categoria) =>(
                        <AutocompleteItem key={categoria.key} value={categoria.name}>
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
                            <EstoqueInput   label="Loja 02" id="EstLj02" 
                                            getSumEstoque={getSomaEstoques}
                                            setEstoqueValues={handleInputChange} estoqueValues={estoqueValues}/>
                        </div>
                        <div className="mb-12">
                            <EstoqueInput   label="Loja 03" id="EstLj03" 
                                            getSumEstoque={getSomaEstoques} 
                                            setEstoqueValues={handleInputChange} estoqueValues={estoqueValues}/>
                        </div>
                        <div className="mb-12">
                            <EstoqueInput   label="Loja 04" id="EstLj04"
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
                </div>
            </div>
            


            {/* Submit Button */}
            <div className="mt-auto flex gap-52 justify-center w-fit ml-auto mr-36">
                <Button color="danger" onPress={() => setConfirmationOpen(!isConfirmationOpen)}>
                    Cancelar
                </Button>
                <Button type="submit" color="success">
                    Salvar
                </Button>
            </div>
    </form>
    </>
    )

    
}
