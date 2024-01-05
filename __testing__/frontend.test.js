import userSliceSubject from '../client/src/redux/slices/userSlice';
import { kubectlSet, showPrompt }  from '../client/src/redux/slices/userSlice';
import store from '../client/src/redux/store';


describe('Test Redux Reducers', () => {
    let state;

    beforeEach(() => {
        state = {
            kubectl: true,
            showPrompt: false,
            cloudInfo: false,
            localInfo: false,
            aksForm: false,
            aksInfo: {
              clusterName: "",
              resourceGroup: "",
            },
            aksCLI: false
        }
    })


    describe('default state action not defined', () => {
      it('should return default state if nothing is passed in', () => {
        expect(userSliceSubject(undefined, {type: undefined})).toEqual(state);
      });
    });

    describe('unrecognized action types', () => {
      it('should return the original with no duplicates', () => {
        const action = {type: 'kolaandhugh'};
        expect(userSliceSubject(state, action)).toBe(state);
      })
    })

    describe('showPrompt action', () => {
      it ('should return the showPrompt property in state as changed', () => {
        const action = {type: showPrompt};
        expect(userSliceSubject(state, action)).not.toBe(state);
      })
    })

    describe('kubectl action alpha', () => {
      it ('should return the kubectl property in state as changed', () => {
        const action = {type: kubectlSet};
        const newState = userSliceSubject(state, action)
        expect(newState).not.toEqual(state);
      })
    })

})