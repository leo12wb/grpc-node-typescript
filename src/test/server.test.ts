import assert from 'assert';
import { Subject } from '../subject/subject.service';

{
    const params = {
        name: 'ts',
        description: 'lore',
    }

    assert.rejects(
        () => Subject.insert(params,{}),
        { message: 'name must be higher than 3'},
        'name must be higher than 3'
    )
}
