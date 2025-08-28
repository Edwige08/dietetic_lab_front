import TitleTwo from "./TitleTwo";

export default function IngestaResults(props: { energy: number, proteins: number, fats: number, ags: number, agmi: number, agpi: number, cholesterol: number, carbohydrates: number, sugar: number, fibers: number }) {
    return (

        <div
            className="flex flex-col gap-4 p-4 m-3 w-[90%] md:w-[75%] bg-white border border-gray-300 rounded-xl shadow-xl"
        >
            <TitleTwo
                text="Résultats"
            />
            <div className="flex flex-row justify-evenly  gap-2">
                <div className="flex flex-col gap-1">
                    <p className="text-center">
                        Calories
                    </p>
                    <div className="flex flex-col justify-center items-center border rounded-full h-17 w-17 shadow-lg border-(--grayColor) bg-(--grayMediumColor)">
                        <p className="text-center font-bold">
                            {(props.energy).toFixed(0)}
                            <br />
                            kcal
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <p className="text-center">
                        Protéines
                    </p>
                    <div className="flex flex-col justify-center items-center border rounded-full h-17 w-17 shadow-lg border-(--redSecondColor) bg-(--redLightColor)">
                        <p className="text-center font-bold">
                            {(props.proteins).toFixed(1)}&nbsp;g <br /> <span className="text-sm font-thin">({Math.round(props.proteins * 4 / props.energy * 100)}%)</span>
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <p className="text-center">
                        Lipides

                    </p>
                    <div className="flex flex-col justify-center items-center border rounded-full h-17 w-17 shadow-lg border-(--yellowSecondColor) bg-(--yellowLightColor)">
                        <p className="text-center font-bold">
                            {(props.fats).toFixed(1)}&nbsp;g <br /> <span className="text-sm font-thin">({Math.round(props.fats * 9 / props.energy * 100)}%)</span>
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <p className="text-center">
                        Glucides

                    </p>
                    <div className="flex flex-col justify-center items-center border rounded-full h-17 w-17 shadow-lg border-(--greenSecondColor) bg-(--greenLightColor)">
                        <p className="text-center font-bold">
                            {(props.carbohydrates).toFixed(1)}&nbsp;g <br /> <span className="text-sm font-thin">({Math.round(props.carbohydrates * 4 / props.energy * 100)}%)</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 text-center text-sm border-t border-l border-(--grayMediumColor)">
                <div className="flex flex-col justify-center items-start px-3 border-b border-r border-(--grayMediumColor) bg-(--grayLightColor) p-1 min-h-10 font-bold">
                    Energie
                </div>
                <div className="flex flex-col justify-center items-center px-3 border-b border-r border-(--grayMediumColor) bg-(--grayLightColor) p-1 min-h-10 font-bold">
                    {(props.energy).toFixed(0)} kcal
                </div>
                <div className="flex flex-col justify-center items-start px-3 border-b border-r border-(--grayMediumColor) bg-(--redLightColor) p-1 min-h-10 font-bold">
                    Protéines
                </div>
                <div className="flex flex-col justify-center items-center px-3 border-b border-r border-(--grayMediumColor) bg-(--redLightColor) p-1 min-h-10 font-bold">
                    {(props.proteins).toFixed(1)} g
                </div>
                <div className="flex flex-col justify-center items-start px-3 border-b border-r border-(--grayMediumColor) bg-(--yellowLightColor) p-1 min-h-10 font-bold">
                    Lipides
                </div>
                <div className="flex flex-col justify-center items-center px-3 border-b border-r border-(--grayMediumColor) bg-(--yellowLightColor) p-1 min-h-10 font-bold">
                    {(props.fats).toFixed(1)} g
                </div>
                <div className="flex flex-col justify-center items-start px-3 border-b border-r border-(--grayMediumColor) p-1 min-h-10 font-bold">
                    - dont AGS
                </div>
                <div className="flex flex-col justify-center items-center px-3 border-b border-r border-(--grayMediumColor) p-1 min-h-10">
                    {(props.ags)} g
                </div>
                <div className="flex flex-col justify-center items-start px-3 border-b border-r border-(--grayMediumColor) p-1 min-h-10 font-bold">
                    - dont AGMI
                </div>
                <div className="flex flex-col justify-center items-center px-3 border-b border-r border-(--grayMediumColor) p-1 min-h-10">
                    {(props.agmi).toFixed(1)} g
                </div>
                <div className="flex flex-col justify-center items-start px-3 border-b border-r border-(--grayMediumColor) p-1 min-h-10 font-bold">
                    - dont AGPI
                </div>
                <div className="flex flex-col justify-center items-center px-3 border-b border-r border-(--grayMediumColor) p-1 min-h-10">
                    {(props.agpi).toFixed(1)} g
                </div>
                <div className="flex flex-col justify-center items-start px-3 border-b border-r border-(--grayMediumColor) p-1 min-h-10 font-bold">
                    - dont cholestérol
                </div>
                <div className="flex flex-col justify-center items-center px-3 border-b border-r border-(--grayMediumColor) p-1 min-h-10">
                    {(props.cholesterol).toFixed(1)} g
                </div>
                <div className="flex flex-col justify-center items-start px-3 border-b border-r border-(--grayMediumColor) bg-(--greenLightColor) p-1 min-h-10 font-bold">
                    Glucides
                </div>
                <div className="flex flex-col justify-center items-center px-3 border-b border-r border-(--grayMediumColor) bg-(--greenLightColor) p-1 min-h-10 font-bold">
                    {(props.carbohydrates).toFixed(1)} g
                </div>
                <div className="flex flex-col justify-center items-start px-3 border-b border-r border-(--grayMediumColor) p-1 min-h-10 font-bold">
                    - dont sucres
                </div>
                <div className="flex flex-col justify-center items-center px-3 border-b border-r border-(--grayMediumColor) p-1 min-h-10">
                    {(props.sugar).toFixed(1)} g
                </div>
                <div className="flex flex-col justify-center items-start px-3 border-b border-r border-(--grayMediumColor) bg-(--blueLightColor) p-1 min-h-10 font-bold">
                    Fibres
                </div>
                <div className="flex flex-col justify-center items-center px-3 border-b border-r border-(--grayMediumColor) bg-(--blueLightColor) p-1 min-h-10 font-bold">
                    {(props.fibers).toFixed(1)} g
                </div>
            </div>
        </div>
    )
}