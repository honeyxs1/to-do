import {format , parseISO} from 'date-fns';

class Todo{
    constructor(title,description,duedate,priority){
        this.id=format(new Date(),'yyyyMMddHHmmssSSS');
        this.title=title;
        this.description=description;
        this.duedate=duedate;
        this.priority=priority;
        this.completed=false;
    }

    getFormattedDate(){
        return format(new Date(this.duedate),'yyyy-MM-dd');

    }
}

export default Todo;