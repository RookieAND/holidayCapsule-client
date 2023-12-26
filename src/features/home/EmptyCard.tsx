import HolidayLogoSvg from '#/assets/icons/holidayLogo.svg';
import QuestionMarkSvg from '#/assets/icons/questionMark.svg';

const EmptyCard = () => (
    <div className="flex flex-col gap-y-8 w-64 px-4 pt-10 py-6 items-center justify-between bg-creme text-red-500 shadow-md shadow-red-700">
        <QuestionMarkSvg className="text-red-600" width={152}/>
        <div id="divider" className="h-0.5 w-full border border-red-500" />
        <HolidayLogoSvg className="text-red-600" width={186} />
    </div>
);1

export default EmptyCard;
