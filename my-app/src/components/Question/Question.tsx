import Answer from '../Answer/Answer'



interface IQuestion {
    id: number;
    word:string;
    pos:string
  }
function Question({quetion}:{quetion:IQuestion}) {

  return (
    <div className='quetion'>
        <h4 className='fw-bold mb-5'>What is the classification of this word? : {quetion?.word}</h4>
        <Answer />
    </div>
  )
}

export default Question