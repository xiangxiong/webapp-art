import React,{useEffect,useState,Fragment} from 'react';
import './index.scss';
import CategoryJD from 'react-category-jd';
import PublicHeader from './../../components/header';
import {connect} from 'react-redux';
import {dispatchCategoryList} from './store/actionCreators';

const Category = React.memo(
  props => {

    const [data,setData] = useState([]);

    useEffect(()=>{
      
      async function fetchCategoryList(){
          const result = await props.dispatchCategoryList({});
          console.log('result',result);
          let response = [];

          for(let i = 0; i < result.length; i++){
            response.push({
              title:result[i].CategoryName,
              path:'/detail',
              image:'//img13.360buyimg.com/mcoss/jfs/t13768/304/553456768/42679/21bc3c35/5a28f1c1N226249b0.jpg',
              children: []
            });
          };

          for(let i = 0; i < result.length; i++){
            if(result[i].AuthorClassifyList.length>0){
               response[i].children.push({
                 title:result[i].AuthorClassifyList[0].AuthorTypeName,
                 children:[]
               })
            }
          }

          for(let i = 0; i < result.length; i++){
            if(result[i].AuthorClassifyList.length>0){
               for(let authItem = 0; authItem < result[i].AuthorClassifyList.length;authItem ++){
                  if(result[i].AuthorClassifyList[authItem].ProviderList && result[i].AuthorClassifyList[authItem].ProviderList.length>0){
                      for(let providerItem = 0;providerItem< result[i].AuthorClassifyList[authItem].ProviderList.length; providerItem ++){
                        let item = result[i].AuthorClassifyList[authItem].ProviderList[providerItem].ProviderName;
                        let imgUrl = `http://res.laoliwuyou.com`+result[i].AuthorClassifyList[authItem].ProviderList[providerItem].ImageName
                        response[i].children[authItem].children.push(
                          { title: item, path: '/abc', image: imgUrl}
                        )
                      }
                  }
               }
            }
          }

          setData(response);
      };

      fetchCategoryList();
    },[]);

    return (
        <Fragment>
            <PublicHeader title="大师分类"/>
            <CategoryJD dataSource={data}/>
        </Fragment>
    )
  }
)

const mapStateToProps = (state) =>{
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchCategoryList: (data) => dispatch(dispatchCategoryList(data))
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(Category);