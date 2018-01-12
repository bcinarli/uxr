/**
 * event-test
 **/

describe('Event Manager', () => {
    let inputElem = uxr('#event-input');
    let paragraphElem = uxr('#event-paragraph');

    let value = '';
    let triggered = [];

    describe('Add Event', () => {
        it('should add an event', () => {
            inputElem.on('change', e => value = e.currentTarget.value);

            inputElem.attr('value', controls.value);
            inputElem.trigger('change');

            expect(value).to.be.equal(controls.value);
        });

        it('should add multiple events at once', () => {
            inputElem.on('focus blur', e => triggered.push(e.type));

            inputElem.trigger('focus');
            inputElem.trigger('blur');

            expect(triggered.includes('focus')).to.be.true;
            expect(triggered.includes('blur')).to.be.true;
        });

        it('should stores the attached events in `uxrAttachedEvents` on item', () => {
            expect(inputElem[0].uxrAttachedEvents.change).to.not.be.undefined;
        });
    });

    describe('Remove Event', () => {
        it('should remove an event', () => {
            value = '';
            inputElem.off('change');
            inputElem.attr('value', controls.value);
            inputElem.trigger('change');

            expect(inputElem[0].uxrAttachedEvents['change']).to.be.undefined;
            expect(inputElem.attr('value')).to.not.be.equal(value);
        });

        it('should remove event with defined handler', () => {
            let eventResult = {};
            let handler = e => {
                eventResult['withHandler'] = e.type
            };

            inputElem.on('change', handler);
            inputElem.on('change', e => {
                eventResult['withAnonFunc'] = e.type
            });

            inputElem.off('change', handler);
            inputElem.trigger('change');

            expect(eventResult['withHandler']).to.be.undefined;
            expect(eventResult['withAnonFunc']).to.be.equal('change');
        });

        it('should remove multiple events at once', () => {
            inputElem.off('focus blur');
            expect(inputElem[0].uxrAttachedEvents['focus']).to.be.undefined;
            expect(inputElem[0].uxrAttachedEvents['blur']).to.be.undefined;
        });
    });

    describe('Single Run Event', () => {
        it('should runs the event one time and remove itself', () => {
            value = '';
            inputElem.once('focus', e => value = e.currentTarget.value);
            inputElem.trigger('focus');

            inputElem.attr('value', controls.newValue);
            inputElem.trigger('focus');

            expect(value).to.not.be.equal(controls.newValue);
        });
    });
});