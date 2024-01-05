import userSliceSubject from '../client/src/redux/slices/userSlice';
// import nodeSliceSubject from '../client/src/redux/slices/nodeSlice'

function add(a, b) {
    return a + b;
}

describe('5 + 6', () => {
    it('should return the answer of 11', () => {
        const result = add(5, 6)
        expect(result).toEqual(11)
    })
})

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


    describe('default state', () => {
      it('should return default state if nothing is passed in', () => {
        expect(userSliceSubject(undefined, {type: undefined})).toEqual(state);
      });
    });
    
})