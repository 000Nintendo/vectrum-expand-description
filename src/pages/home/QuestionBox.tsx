/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { IQuestion } from "../../@types/IQuestion";

import "./QuestionBox.scss";

interface IQuestionBox {
  questionData: IQuestion;
  isLastQuestion: boolean;
}

const QuestionBox = ({ questionData, isLastQuestion }: IQuestionBox) => {
  let answereTextContainerHeight: number | null = null;
  let answereParagraph: HTMLElement | null = null;
  let answereParagraphHeight: string | null = null;
  let userDetailsContainer: HTMLElement | null = null;
  let readMoreTextButton: HTMLElement | null = null;
  let gradientBackground: HTMLElement | null = null;

  let lastQuestionContainer: HTMLElement | null = null;
  let lastQuestionContainerHeight: number | null = null;
  let lastQuestioinContainerBlurredLayer: HTMLElement | null = null;
  let lastQuestionContainerViewMoreText: HTMLElement | null = null;
  let viewLessQuestions: HTMLElement | null = null;

  const answereTextClass = `answere-text-${questionData.id}`;
  const userDetailsContainerClass = `user-details-container-${questionData.id}`;
  const readMoreButtonClass = `read-more-button-${questionData.id}`;
  const gradientBackgroundClass = `gradient-background-${questionData.id}`;

  useEffect(() => {
    answereParagraph = document.querySelector(
      `.${answereTextClass}`
    ) as HTMLElement | null;

    const lineHeight = 22;
    const containerHeight = answereParagraph?.offsetHeight as number;

    if (!answereTextContainerHeight) {
      answereTextContainerHeight = containerHeight;
    }

    if (answereParagraph) {
      answereParagraph.style.lineHeight = lineHeight + "px";
      answereParagraph.style.height = 5 * lineHeight + "px";
    }

    userDetailsContainer = document.querySelector(
      `.${userDetailsContainerClass}`
    ) as HTMLElement | null;
    readMoreTextButton = document.querySelector(
      `.${readMoreButtonClass}`
    ) as HTMLElement | null;
    gradientBackground = document.querySelector(
      `.${gradientBackgroundClass}`
    ) as HTMLElement | null;

    if (isLastQuestion) {
      lastQuestionContainer = document.querySelector(
        `.question-container-clone-${questionData.id}`
      ) as HTMLElement | null;

      lastQuestioinContainerBlurredLayer = document.querySelector(
        `.view-more-questions-container-${questionData.id}`
      ) as HTMLElement | null;

      lastQuestionContainerViewMoreText = document.querySelector(
        `.read-more-question-text-${questionData.id}`
      ) as HTMLElement | null;

      viewLessQuestions = document.querySelector(
        `.view-less-questions`
      ) as HTMLElement | null;

      lastQuestionContainerHeight = answereParagraph?.offsetHeight as number;

      lastQuestionContainerViewMoreText?.addEventListener("click", () => {
        lastQuestioinContainerBlurredLayer?.classList.add("display-none");
        viewLessQuestions?.classList.remove("display-none");
      });

      viewLessQuestions?.addEventListener("click", () => {
        lastQuestioinContainerBlurredLayer?.classList.remove("display-none");
        viewLessQuestions?.classList.add("display-none");
      });
    }
  }, [questionData.id]);

  const toggleReadMore = () => {
    if (!answereParagraphHeight) {
      const answereParagraphClone = document.querySelector(
        `.hidden-${answereTextClass}`
      ) as HTMLElement | null;

      const containerHeight = answereParagraphClone?.offsetHeight as number;
      answereParagraphHeight = answereParagraph?.style.height as string;

      if (answereParagraph)
        answereParagraph.style.height = containerHeight + "px";

      userDetailsContainer?.classList.add("display-none");
      gradientBackground?.classList.add("hide-background");

      if (readMoreTextButton) readMoreTextButton.textContent = "Read less";
      return;
    }

    if (answereParagraph) {
      answereParagraph.style.height = answereParagraphHeight;
      userDetailsContainer?.classList.remove("display-none");
      if (readMoreTextButton) readMoreTextButton.textContent = "Read more";
      answereParagraphHeight = null;
      gradientBackground?.classList.remove("hide-background");
      return;
    }
  };

  return (
    <div className="question-box">
      <div className="quetion-content-container">
        <h2 className="title text-title">{questionData.question}</h2>
        <br />
        <div className="title-devider" />
        <div
          className="answere-container text-secondary-dark"
          onClick={toggleReadMore}
        >
          {/* <b className="">Solution</b> */}
          <div className={`answere-text text-paragraph ${answereTextClass}`}>
            {questionData.answere}
          </div>
          <div className={`hidden-answere-text hidden-${answereTextClass}`}>
            {questionData.answere}
          </div>
          <div className="read-more-container">
            <div
              className={`gradient-background ${gradientBackgroundClass}`}
            ></div>
            <p
              className={`read-more-button text-secondary-dark ${readMoreButtonClass}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleReadMore();
              }}
            >
              Read more
            </p>
          </div>
        </div>

        <div className={`user-details-container ${userDetailsContainerClass}`}>
          <div className="profile-image">
            <img src={questionData.expert_profile_image} alt=" " />
          </div>
          <div className="details">
            <b className="text-title">
              {questionData.expert_first_name} {questionData.expert_last_name}
            </b>
            <p className="work-details text-paragraph">
              {questionData.expert_designation}, {questionData.expert_country}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionBox;
