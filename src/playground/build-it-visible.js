class VisiblityToggle extends React.Component{
    constructor(props){
        super(props);
        this.toggleDetails = this.toggleDetails.bind(this)
        this.state = {
            visibility: false
        };
    }
    toggleDetails(){
        this.setState((prevState)=>{
            return{
                visibility: !prevState.visibility
            }
        })
    }


    render(){
        return(
            <div>
            <h1>Visibility toggle</h1>
            <button onClick={this.toggleDetails}>
                {this.state.visibility ? 'Hide details': 'Show details'}
            </button>
            {this.state.visibility && (
                <div>
                <p>This is text</p>
                </div>
            )}
            </div>
        );
    }
    
}

ReactDOM.render(<VisiblityToggle/>, document.getElementById('app'))


// console.log('App.js is running')
// const appRoot = document.getElementById('app');
// let show = false

// const showData = () => {
//     show = !show
//     renderApp()
// }

// const renderApp = () => {
//     const template = (
//         <div>
//             <h1>Visibility toggle</h1>
//             <button id="btn" onClick={showData}>{(show ? 'Hide details' : 'Show details')}</button>
//             {show && (
//                 <div>
//                     <p>You can now see this</p>
//                 </div>
//             )
//             }

//         </div>
//     )
//     ReactDOM.render(template, appRoot);
// };
// renderApp();
