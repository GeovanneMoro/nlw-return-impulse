import { FeedbackType, feedbackTypes } from '..';
import { CloseButton } from '../../CloseButton';

interface IFeedbackTypeStepProps {
  onFeedbackTypeChanged: (type: FeedbackType) => void;
}

export const FeedbackTypeStep = ({
  onFeedbackTypeChanged,
}: IFeedbackTypeStepProps) => {
  return (
    <>
      <header>
        <span className="text-xl leading-6">Deixe seu feedback</span>
        <CloseButton />
      </header>
      <div className="flex pt-10 pb-10 gap-2 w-full">
        {Object.entries(feedbackTypes).map(([type, { title, image }]) => (
          <button
            key={type}
            className="bg-zinc-800 rounded-lg py-5 w-24 flex-1 flex flex-col items-center gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none"
            onClick={() => onFeedbackTypeChanged(type as FeedbackType)}
            type="button"
          >
            <img loading="eager" src={image.source} alt={image.alt} />
            <span>{title}</span>
          </button>
        ))}
      </div>
    </>
  );
};
