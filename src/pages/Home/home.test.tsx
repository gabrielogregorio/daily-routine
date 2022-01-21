import 'dotenv/config'
import { render, screen } from '@testing-library/react'
import { Home } from '.'
import userEvent from '@testing-library/user-event'


describe('<Home />', () => {
  it('should render tasks', async () => {
    render( <Home /> )
    userEvent.type(screen.getByLabelText('input-task'), 'Minha task 1{enter}')
    expect(screen.getByText('Minha task 1')).toBeDefined()

    userEvent.type(screen.getByLabelText('input-task'), 'Minha task 2{enter}')
    userEvent.type(screen.getByLabelText('input-task'), 'Minha task 3{enter}')
    userEvent.type(screen.getByLabelText('input-task'), 'Minha task 4{enter}')

    expect(screen.getByText('Minha task 2')).toBeDefined()
    expect(screen.getByText('Minha task 3')).toBeDefined()
    expect(screen.getByText('Minha task 4')).toBeDefined()
  })

  it('should render tasks and move positions', async () => {
    render( <Home /> )
    userEvent.type(screen.getByLabelText('input-task'), 'Minha task 1{enter}')
    userEvent.type(screen.getByLabelText('input-task'), 'Minha task 2{enter}')
    userEvent.type(screen.getByLabelText('input-task'), 'Minha task 3{enter}')

    expect(screen.getAllByText(/Minha task/i)[0].textContent).toEqual('Minha task 1')
    expect(screen.getAllByText(/Minha task/i)[1].textContent).toEqual('Minha task 2')
    expect(screen.getAllByText(/Minha task/i)[2].textContent).toEqual('Minha task 3')

    userEvent.click(screen.getAllByRole('button', {name: /arrow-top/i})[1])

    expect(screen.getAllByText(/Minha task/i)[0].textContent).toEqual('Minha task 2')
    expect(screen.getAllByText(/Minha task/i)[1].textContent).toEqual('Minha task 1')
    expect(screen.getAllByText(/Minha task/i)[2].textContent).toEqual('Minha task 3')

    userEvent.click(screen.getAllByRole('button', {name: /arrow-top/i})[0])

    expect(screen.getAllByText(/Minha task/i)[0].textContent).toEqual('Minha task 2')
    expect(screen.getAllByText(/Minha task/i)[1].textContent).toEqual('Minha task 1')
    expect(screen.getAllByText(/Minha task/i)[2].textContent).toEqual('Minha task 3')

    userEvent.click(screen.getAllByRole('button', {name: /arrow-bottom/i})[2])

    expect(screen.getAllByText(/Minha task/i)[0].textContent).toEqual('Minha task 2')
    expect(screen.getAllByText(/Minha task/i)[1].textContent).toEqual('Minha task 1')
    expect(screen.getAllByText(/Minha task/i)[2].textContent).toEqual('Minha task 3')

    userEvent.click(screen.getAllByRole('button', {name: /arrow-bottom/i})[1])

    expect(screen.getAllByText(/Minha task/i)[0].textContent).toEqual('Minha task 2')
    expect(screen.getAllByText(/Minha task/i)[1].textContent).toEqual('Minha task 3')
    expect(screen.getAllByText(/Minha task/i)[2].textContent).toEqual('Minha task 1')
  })
})
