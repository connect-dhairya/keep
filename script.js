const addNote = document.querySelector('#add');

const updateLSData = () => {
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];

    textAreaData.forEach((curNote)=>{
        return notes.push(curNote.value);
    });
    console.log(notes);

    localStorage.setItem('notes' , JSON.stringify(notes));
}

const MakeANote = (text = '') => {
    const note = document.createElement('div');
    note.classList.add('note');

    const htmlData = `
    <div class="tools">
        <button class="edit"><i class="fa fa-edit"></i></button>
        <button class="delete"><i class="fa fa-trash-alt"></i></button>
    </div>

    <div class="main ${text ? "" :"hidden"} " > </div>
    <textarea class="${text ? "hidden" :""}" ></textarea>`
    
    note.insertAdjacentHTML('afterbegin',htmlData);
    // console.log(note);
    

    const editBtn = note.querySelector('.edit');
    const delBtn = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textArea = note.querySelector('textarea');
    

    textArea.value = text;
    mainDiv.innerHTML = text;

    //Deleting the note
    // console.log(delBtn);
    delBtn.addEventListener('click' , ()=>{
        note.remove();
        updateLSData();
    });
    
    //toggle between textarea and main div

    editBtn.addEventListener('click',()=>{
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    });

    textArea.addEventListener('change',()=>{
        const value = event.target.value;
        mainDiv.innerHTML = value;

        updateLSData();
    });


    document.body.appendChild(note);
}

// gettting data back

const notes = JSON.parse(localStorage.getItem('notes'));

if(notes){
    notes.forEach((note) => {
       return MakeANote(note);
    });
}

addNote.addEventListener('click',() => MakeANote());