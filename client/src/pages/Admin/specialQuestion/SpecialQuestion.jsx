import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import AnswerItem from '../../../components/answerItem/AnswerItem'
import useGetAnswer from '../../../hooks/useGetAnswer'
import useGetQuestions from '../../../hooks/useGetQuestions'
import { BiPencil } from 'react-icons/bi'
import styles from './specialQuestion.module.css'
import EditQuestionModal from '../../../components/modal/editQuestionModal/EditQuestionModal'

const SpecialQuestion = () => {
	const [openQuestionModal, setOpenEditModal] = useState(false)
	const openEditAnswerModal = useSelector(
		state => state.editModal.openEditAnswerModal
	)
	const params = useParams()

	const { id_question } = params
	const user = useSelector(state => state.auth.user)

	const chosedQuestion = id_question

	const { getSpecialAnswer, getSpecialRightAnswer, answers, rightAnswer } =
		useGetAnswer(id_question)

	const { getSpecialQuestionForEdit, test } = useGetQuestions(chosedQuestion)

	console.log(test)

	const nextQuestion = () => {
		console.log('adminClick')
	}
	const checkAnswer = () => {}
	const handleModal = () => {
		setOpenEditModal(true)
	}

	useEffect(() => {
		getSpecialQuestionForEdit()
		getSpecialAnswer()
		getSpecialRightAnswer()
	}, [])

	useEffect(() => {
		getSpecialAnswer()
	}, [openEditAnswerModal])

	return (
		<div className={styles.SpecialQuestion}>
			{test ? (
				<div>
					{openQuestionModal && (
						<EditQuestionModal
							getSpecialQuestionForEdit={getSpecialQuestionForEdit}
							setOpenEditModal={setOpenEditModal}
							test={test.question}
							image_question={test.image}
							audio_question={test.audio}
						/>
					)}
					<div className={styles.quest}>
						<div className={styles.questionBlock}>
							<div className={styles.question}>{test.question.question}</div>
							<button onClick={handleModal} className={styles.pen}>
								<BiPencil />
							</button>
						</div>
						{test.image && (
							<div className={styles.imageBlock}>
								<img
									className={styles.image}
									src={`http://localhost:443/${test.image.path}`}
									alt='photo'
								/>
							</div>
						)}
						{test.audio && (
							<div>
								<audio controls>
									<source
										src={`http://localhost:443/${test.audio.path}`}
										type='audio/mpeg'
									/>
								</audio>
							</div>
						)}
					</div>
					<div>
						{answers && (
							<>
								{answers.map((item, index) => (
									<AnswerItemj
										key={item.id_answers}
										item={item}
										nextQuestion={nextQuestion}
										checkAnswer={checkAnswer}
										isRight={rightAnswer}
										index={item.id_answers}
										user={user}
									/>
								))}
							</>
						)}
					</div>
				</div>
			) : (
				<div>Loading</div>
			)}
		</div>
	)
}

export default SpecialQuestion
