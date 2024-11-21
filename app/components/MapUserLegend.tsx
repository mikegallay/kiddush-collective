'use client'
// components/Header.tsx
import {  useState } from 'react';

export default function MapUserLegend() {
    const [legendVisible, setLegendVisible] = useState(false)

    return (
        <div className='map-legend-wrapper absolute top-0 right-0 m-6 z-20 text-right '>
            <button 
                className="relative bg-white border-stone-300 border-2 py-2 px-3 mb-2 rounded-sm shadow-sm"
                aria-label="Toggle Legend"
                aria-expanded={legendVisible}
                aria-controls="legend"
                onClick={() => setLegendVisible(prev => !prev)}
            >
                LEGEND
            </button>

            {legendVisible &&
            <ul className="relative map-legend-container bg-white border-stone-300 border-2 p-4 rounded-lg text-left shadow-sm" id="legend" aria-hidden={!legendVisible}>
                <li><span><img className='inline pr-2' src={'/images/marker-main.png'} width='25' height='29'/>User</span></li>
                <li><span><img className='inline pr-2' src={'/images/marker-father.png'} width='25' height='29'/>Father</span></li>
                <li><span><img className='inline pr-2' src={'/images/marker-pat-mother.png'} width='25' height='29'/>Father's Mother</span></li>
                <li><span><img className='inline pr-2' src={'/images/marker-pat-father.png'} width='25' height='29'/>Father's Father</span></li>
                <li><span><img className='inline pr-2' src={'/images/marker-mother.png'} width='25' height='29'/>Mother</span></li>
                <li><span><img className='inline pr-2' src={'/images/marker-mat-mother.png'} width='25' height='29'/>Mother's Mother</span></li>
                <li><span><img className='inline pr-2' src={'/images/marker-mat-father.png'} width='25' height='29'/>Mother's Father</span></li>
            </ul>}
        </div>
    );
}
