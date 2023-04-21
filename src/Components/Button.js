import React, { useContext } from 'react';
import { CalcContext } from '../context/CalcContext';

const getstyleName = btn => {

    const className = {
        '=': 'equals',
        'x': 'opt',
        '-': 'opt',
        '+': 'opt',
        '/': 'opt',
    }
    return className[btn]
}

const Button = ({ value }) => {
    const { calc, setCalc } = useContext(CalcContext);
    console.log(setCalc)
    // user click comma
    const commaClick = () => {
        setCalc({
            ...calc,
            num: !calc.num.toString().includes('.') ? calc.num + value : calc.num

        })
    }
    //user click c
    const resetClick = () => {
        setCalc({ sign: '', num: 0, res: 0 })
    }
    // user click number
    const handleClickButton = () => {
        const numberString = value.toString();


        let numberValue;
        if (numberString === '0' && calc.num === 0) {
            numberValue = "0"
        } else {
            numberValue = Number(calc.num + numberString)
        }

        setCalc({
            ...calc,
            num: numberValue
        })
    }
    // user click operation
    const signClick = () => {
        setCalc({
            sign: value,
            res: !calc.res && calc.num ? calc.num : calc.res,
            num: 0
        })
    }
    // User click equals
    const equalsClick = () => {
        if (calc.res && calc.num) {
            const math = (a, b, sign) => {
                const result = {
                    '+': (a, b) => a + b,
                    '-': (a, b) => a - b,
                    'x': (a, b) => a * b,
                    '/': (a, b) => a / b,
                }
                return result[sign](a, b);
            }

            setCalc({
                res: math(calc.res, calc.num, calc.sign),
                sign: '',
                num: 0
            })
        }
    }


    const handleBtnClick = () => {
        const results = {
            '.': commaClick,
            'c': resetClick,
            '/': signClick,
            'x': signClick,
            '-': signClick,
            '+': signClick,
            '=': equalsClick
        }
        if (results[value]) {
            return results[value]()
        } else {

            return handleClickButton()
        }
        return results[value]();
    }
    return (
        <div>
            <button onClick={handleBtnClick} className={`${getstyleName(value)} button`}>{value}</button>
        </div>
    );

}
export default Button;