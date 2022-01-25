import React,{ Component } from 'react';
import Subject from './components/Subject'
import TOC from './components/TOC'
import ReadContent from './components/ReadContent'
import CreateContent from './components/CreateContent'
import UpdateContent from './components/UpdateContent'
import Control from './components/Control'

import './App.css';


class App extends Component{

  constructor(props){
    super(props);
    this.max_content_id=3;
    this.state ={
      mode: "read",
      selected_content_id : 2,
      subject:{title:'WEB', sub:'world wide web!'},
      welcome:{title:'Welcom', desc: 'Hello, React!!'},
      contents:[
        {id:1, title:'HTML', desc: 'HTML is for information'},
        {id:2, title:'CSS', desc: 'CSS is for design'},
        {id:3, title:'JavaScript', desc: 'JavaScript is for interactive'}
      ]
    }

  }
  getReadContent(){
    var i = 0; 
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id){
          return data;
        }
        i= i+1;
      }

  }

  getContent(){
    var _title, _desc, _article = null;

    if(this.state.mode ==='welcome'){
      _title=this.state.welcome.title;
      _desc= this.state.welcome.desc;
      _article =<ReadContent title ={_title} desc={_desc}></ReadContent>
    }else if(this.state.mode === 'read'){
        var _content = this.getReadContent();
      _article =<ReadContent title ={_content.title} desc={_content.desc}></ReadContent>
    }else if(this.state.mode === 'create'){
      _article =<CreateContent onSubmit={function(_title,_desc){
  
        this.max_content_id = this.max_content_id+1; 
        /*
        ## shouldComponentUpdate 쓰려면 state 원본이 불변(immutable)해야함
        1. concat 이용하여 새로운 객체로 원본 아예 업데이트 해줌(push처럼 원본에 직접 넣는거아님 )
        var _contents = this.state.contents.concat(
          {id: this.max_content_id, title: _title, desc:_desc}
        )
        this.setState({
          contents: _contents
        });
        */
       // 2. Array.from 을 이용하여 새로운 배열(완전 다른 객체)를 생성 후 push 사용한 뒤 원본 갈아껴줌 
      // 객체인 경우는 Object.assign을 이용하여 객체 복사하셈 (깊은 복사, 복사하였다하더라도 두개의 객체가 연관성이 완전히 끊어짐)
       var newConetents = Array.from(this.state.contents);
       newConetents.push( {id: this.max_content_id, title: _title, desc:_desc});
       this.setState({
        contents: newConetents,
        mode:'read',
        selected_content_id : this.max_content_id
      });

       console.log("CREATE: " + _title, _desc);

      }.bind(this)}></CreateContent>
    }else if(this.state.mode == 'update'){
 
      var _content = this.getReadContent();
      _article =<UpdateContent data= {_content} onSubmit={function(_id, _title,_desc){
       
       var _contents = Array.from(this.state.contents); 
        var i = 0 
        while(i < _contents.length){
          if(_contents[i].id === _id){
            _contents[i] = {id: _id, title: _title, desc: _desc};
            break;
          }
          i=i+1;
        }       
        this.setState({
          contents: _contents,
          mode: "read"
        });
      }.bind(this)}></UpdateContent>
    }
    
    return _article;
  }

  render() {

    console.log('App render');
    return (
      <div> 
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangePage={function(){this.setState({mode: 'welcome'})}.bind(this)} 
        >
        </Subject> 
        <TOC data={this.state.contents} onChangePage={function(id){ 
            this.setState({
              mode:'read', selected_content_id: Number(id) }
            )}.bind(this)}>
            
        </TOC>
        <Control onChangeMode={function(_mode){
          if(_mode == 'delete'){
            if(window.confirm('really?')){
              var _contents =Array.from(this.state.contents);
              var i = 0 ;

              console.log(this.state.selcted_content_id);
              while(i< _contents.length){
                if(_contents[i].id === this.state.selected_content_id){
                  _contents.splice(i, 1);          
                  break;
                }
                i = i+1;
              }
              this.setState({
                mode : "welcome",
                contents: _contents
              });      

              alert("deleted!");
            }else{
              this.steState({
                mode: _mode
              });
            }
          }
        }.bind(this)}></Control>
        {this.getContent()}
      </div> 
    )
  }
} 


export default App;
