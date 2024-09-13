import React, { useContext } from 'react'
import { DayNightContext } from './DayNightMode';
import Image from 'next/image';

function DayNightToggleButton() {
    const {mode, toggleMode} = useContext(DayNightContext);

    return (
        <>
            {mode === 'day' ?
                <Image width={136} height={72} src='/images/dayButton.png' onClick={toggleMode} alt='Day Night Mode Toggle Button'  style={{ width:'95px', height:'50px' ,display:'flex', position: 'absolute', top: '5%', left: '5%', zIndex: '1'}}></Image>
                :
                <Image width={136} height={72} src='/images/nightButton.png' onClick={toggleMode} alt='Day Night Mode Toggle Button'  style={{width:'95px', height:'50px' ,display:'flex', position: 'absolute', top: '5%', left: '5%', zIndex: '1'}}></Image>
            }
        </>
        
    );
};

export default DayNightToggleButton