import Modal from "../components/Modal";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const activeModalMock = {
    sprites:{
        front_default: "https://urltest.com"
    },
    id:"1",
    name: "pokemon teste",
    types:[
        {
            type:{
                name: "type teste"
            }
        }
    ],
    weight: 10,
    height: 10
}

const closeModalMock = jest.fn()

describe("Modal", () => {
    
    test("deve renderizar um modal na tela", () => {
        render(<Modal activeModal={activeModalMock} closeModal={closeModalMock}/>)

    })

    test("deve renderizar os elementos do modal: imagem, id, name, type, peso e altura", () => {
        render(<Modal activeModal={activeModalMock} closeModal={closeModalMock}/>)

        const image = screen.getByRole('img', { name: /pokemon teste/i })
        const id = screen.getByRole('heading', { name: /#1 pokemon teste/i })
        const name = screen.getByText(/pokemon teste/i)  
        const type = screen.getByText(/type teste/i)
        const weight = screen.getByText(/1\.0 kg/i)
        const height = screen.getByText(/1\.0 m/i)
        const closeBtn = screen.getByRole('button', { name: /❌/i })

        expect(image).toBeInTheDocument()
        expect(id).toBeInTheDocument()
        expect(name).toBeInTheDocument()
        expect(type).toBeInTheDocument()
        expect(weight).toBeInTheDocument()
        expect(height).toBeInTheDocument()
        expect(closeBtn).toBeInTheDocument()
    })

    test("deve chamar a função de fechamento do modal ao clicar no botão de fechar", async () => {
        const user = userEvent.setup()

        render(<Modal activeModal={activeModalMock} closeModal={closeModalMock}/>)

        const closeBtn = screen.getByRole('button', { name: /❌/i })

        await user.click(closeBtn)
        
        expect(closeModalMock).toBeCalledTimes(1)
        expect(closeModalMock).toReturn()
    })
})