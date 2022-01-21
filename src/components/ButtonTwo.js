export function ButtonTwo () {

    const logFunction = () => {
        console.log('working again')
    }

    return (
        <div>
            <button onClick={logFunction}>Click Me</button>
        </div>
    )
}