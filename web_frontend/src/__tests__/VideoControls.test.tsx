import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import VideoControls, { defaultAVState, avStateInterface } from '../Video/VideoControls'
import DoctorInterface from '../DoctorInterface'

const videoControls = (avState: avStateInterface, setAVState: React.Dispatch<React.SetStateAction<avStateInterface>> , endSession: Function) => {
    return (
        <BrowserRouter>
          <VideoControls
            avState={avState}
            setAVState={setAVState}
            endSession={endSession}
          />
        </BrowserRouter>
    )
}

const getInterface = () => {
    return (
        <BrowserRouter>
          <DoctorInterface />
        </BrowserRouter>
    )
}

it("all buttons initial state render correctly", ()=> {
    const { getByTestId, getByText } = render(
        videoControls(defaultAVState, jest.fn(), jest.fn())
    )
    
    expect(getByTestId('mic-off-icon')).toBeDefined()
    expect(getByTestId('videocam-off-icon')).toBeDefined()
    expect(getByText('End Session')).toBeDefined()
    expect(getByTestId('volume-up-icon')).toBeDefined()
    expect(getByTestId('volume-slider')).toBeDefined()
})

it("toggable buttons are toggable", ()=> {
    //Use getInterface because cannot setAVState in tests
    const { getByTestId } = render(getInterface())

    expect(getByTestId('mic-off-icon')).toBeDefined()
    expect(getByTestId('videocam-off-icon')).toBeDefined()
    expect(getByTestId('volume-up-icon')).toBeDefined()

    fireEvent.click(getByTestId('mic-off-icon'))
    fireEvent.click(getByTestId('videocam-off-icon'))
    fireEvent.click(getByTestId('volume-up-icon'))
    
    expect(getByTestId('mic-on-icon')).toBeDefined()
    expect(getByTestId('videocam-on-icon')).toBeDefined()
    expect(getByTestId('volume-off-icon')).toBeDefined()
})

it("when volume-slider is set to 0, volume off icon appears", ()=> {
    const { getByTestId } = render(getInterface())
    expect(getByTestId('volume-up-icon')).toBeDefined()

    const sliderInput = getByTestId('volume-slider').lastElementChild as HTMLElement
    expect(sliderInput.getAttribute('aria-valuenow')).toBe("50")

    fireEvent.click(getByTestId('volume-up-icon'))

    expect(sliderInput.getAttribute('aria-valuenow')).toBe("0")
    expect(getByTestId('volume-off-icon')).toBeDefined()
})

it("End session onclick works ", ()=> {
    let session = false
    const { getByText, container } = render(
        videoControls(defaultAVState, jest.fn(), () => {session = true})
    )
    expect(container.childElementCount).toBeGreaterThan(0)
    expect(getByText('End Session')).toBeDefined()
    fireEvent.click(getByText('End Session'))

    expect(session).toBe(true)
})