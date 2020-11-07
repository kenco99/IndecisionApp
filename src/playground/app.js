class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.state = {
            options: []
        }
    }

    componentDidMount() {
        try {
            console.log("did mount")
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);

            if (options) {
                this.setState(() => ({ options }))
            }
        } catch (e) {
            //Do Nothing at all
        }

    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem("options", json)
            console.log("did update")
        }
    }
    componentWillUnmount() {

    }

    handleDeleteOptions() {
        this.setState(() => ({ options: [] }));
    }

    handleDeleteOption(optionToRemove) {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => option !== optionToRemove)
        }));
    }

    handlePick() {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum]
        console.log(option)
        //alert(option);
    }

    handleAddOption(option) {
        if (!option) {
            return 'Enter Valid Value to add Item'
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exits'
        }
        //console.log(option)
        this.setState((prevState) => ({ options: prevState.options.concat([option]) }));
    }

    render() {
        const subtitle = 'Put your life in the hands of a computer';
        return (
            <div>
                <Header subtitle={subtitle} />
                <Action
                    hasOptions={(this.state.options.length > 0)}
                    handlePick={this.handlePick}
                />
                <Options
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}
                />
                <Addoption
                    handleAddOption={this.handleAddOption}
                />
            </div>
        );
    }
}

// IndecisionApp.defaultProps = {
//     options: []
// };

const Header = (props) => {
    return (<div>
        <h1>{props.title}</h1>
        {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>);
};

Header.defaultProps = {
    title: 'Indecision'
}


const Action = (props) => {
    return (
        <div>
            <button
                onClick={props.handlePick}
                disabled={!props.hasOptions}
            >
                What should i do?
             </button>
        </div>
    );
};

const Options = (props) => {
    return (
        <div>
            <button onClick={props.handleDeleteOptions}>Remove All</button>
            {props.options.length === 0 && <p>Please add an option to get started.</p>}
            {props.options.map((option) =>
                <Option
                    key={option}
                    option={option}
                    handleDeleteOption={props.handleDeleteOption}
                />)}
        </div>
    );
};

const Option = (props) => {
    return (
        <div>
            {props.option}
            <button
                onClick={(e) => {
                    props.handleDeleteOption(props.option)
                }}
            >
                Remove
            </button>
        </div>
    );
};


class Addoption extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        };
    }
    handleAddOption(e) {
        e.preventDefault();
        const option = e.target.elements.option.value.trim();

        const error = this.props.handleAddOption(option)

        this.setState(() => ({ error }));
        if (!error) {
            e.target.elements.option.value = '';
        }
    }
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option"></input>
                    <button>Add Option</button>
                </form>
            </div>
        );
    }
}


ReactDOM.render(<IndecisionApp />, document.getElementById('app'));