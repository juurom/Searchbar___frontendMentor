import {useState} from 'react';



function Job(props){
    const jobData= props.data;
    const [Keyword, setKeyword] = useState("");
    const [KeywordList, setKeywordList] = useState([]);

    function handleSubmit(e){
        e.preventDefault();
        console.log(KeywordList);

        if (Keyword!=="") {
            setKeywordList(KeywordList=>[...KeywordList, Keyword]);
        }
        setKeyword("");
    }

    function handleChange(e){
        setKeyword(e.target.value);     
    }

    function handleDeleteAll(e){
        setKeywordList([]);
    }
    
    function handleDeleteOne(e){
        const deleteKeyword=e.target.className;
        console.log(`DELETE: ${deleteKeyword}`);
        setKeywordList(KeywordList.filter((checkKeyword)=>checkKeyword !== deleteKeyword));//keyword 찾아서 삭제!
    }

    function makeKeyword(e){
        return (
            <>
                {KeywordList.map((keyword)=>(
                    <div className="keywordBox">
                        <span className={keyword}>{keyword}</span>
                        <button className={keyword} onClick={handleDeleteOne}>x</button>
                    </div>
     
                ))}
            </>
        )
    }



    return (
        <>
        <div className="top">
            <div className="searchArea">
                {KeywordList!==[] && makeKeyword()}
                <form onSubmit={handleSubmit}>
                <input className="searchBar" type="text" value={Keyword} onChange={handleChange} placeholder="Search for..."/>
                </form>
                <button className="clearBtn"onClick={handleDeleteAll}>clear</button>
            </div>
            
        </div>

        <div className="jobList">
        {jobData.filter((data)=>{
            if (KeywordList.length===0) return data;
            let tmpdata=""; let tmpkeyword=""; let returncheck=true;
            for(let i=0; i<KeywordList.length; i++){
                tmpdata=[data.level.toLowerCase(), data.role.toLowerCase()].concat(data.languages.map(d=>d.toLowerCase()), data.tools.map(d=>d.toLowerCase()));
                tmpkeyword=KeywordList[i].toLowerCase();
                if(!tmpdata.includes(tmpkeyword)){
                    returncheck = false;
                }
            }
            if (returncheck) return data;
        }
        ).map((data)=>(
            <div className="job" key={data.id}>
                <div className="logo">
                    <img src={require(`./images/${data.logo}`)} alt={data.company + " logo"}/>
                </div>
                <div className="info">
                    <div className="company">
                        {data.company}
                        {data.new === true && <div className="new">NEW</div>}
                        {data.featured === true && <div className="featured">FEATURED</div>}
                    </div>
                    <div className="position">
                        {data.position}
                    </div>
                    <div className="condition">
                        {data.postedAt}   •   {data.contract}   •   {data.location}
                    </div>
                </div>
                <div className="keyword">
                    <span className="keywordEach">{data.role}</span>
                    <span className="keywordEach">{data.level}</span>
                    {data.languages.map((d)=><span className="keywordEach">{d}</span>)}
                    {data.tools.map((d)=><span className="keywordEach">{d}</span>)}
                </div>

            </div>
        ))
        }
        </div>
        </>
    )
  }

export default Job;  