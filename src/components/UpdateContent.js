import React, {Component} from 'react';

class UpdateContent extends Component{
constructor(props){
  super(props);
  this.state = {
    id : this.props.data.id,
    title : this.props.data.title,
    desc: this.props.data.desc
  }
  this.inputFormHandler = this.inputFormHandler.bind(this);
}
inputFormHandler(e){
  this.setState({[e.target.name]: e.target.value}); //대괄호 안에 값을 객체에서 property 값으로 사용 간으 
}

  render() {
    console.log(this.props.data);
    console.log('UpdateContent render');
    return (
      <article>
        <h2>Update</h2>
        <form action="/create_process" method="post" onSubmit={function(e){
          e.preventDefault();
          this.props.onSubmit(
            this.state.id,
            this.state.title,
            this.state.desc
          );
        }.bind(this)}>
          <input type="hidden" name="id" value={this.state.id}></input>
          <p><input type="text" name="title" placeholder='title' value = {this.state.title} onChange={this.inputFormHandler}></input></p>   
          <p><textarea  name="desc" placeholder='description' value = {this.state.desc} onChange={this.inputFormHandler}></textarea></p>  
          <p><input type="submit"></input></p>  
        </form>
      </article> 
    )
  }
} 

export default UpdateContent;