import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "antd";
import styled from "styled-components";

const SearchContainer = styled.div`
  width: 400px;
  height: 45px;
  position: relative;
  border: 0;
  img {
    position: absolute;
    right: 10px;
    top: 10px;
  }
`;

const SearchInput = styled(Input)`
  border: 0;
  padding-left: 10px;
  background-color: #eaeaea;
  width: 100%;
  height: 100%;
  outline: none;
`;

const AutoSearchContainer = styled.div`
  z-index: 3;
  height: 50vh;
  width: 400px;
  background-color: #fff;
  position: absolute;
  top: 45px;
  border: 2px solid;
  padding: 15px;
`;

const AutoSearchWrap = styled.ul``;

const AutoSearchData = styled.li`
  padding: 10px 8px;
  width: 100%;
  /* height: 30px; */
  font-size: 14px;
  font-weight: bold;
  z-index: 4;
  letter-spacing: 2px;
  &:hover {
    background-color: #edf5f5;
    cursor: pointer;
  }
  position: relative;
  img {
    position: absolute;
    right: 5px;
    width: 18px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const Search = () => {
  const [realSearchText, setRealSearchText] = useState("");
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    onSearch();
  }, [realSearchText]);

  const onSearch = async () => {
    const url =
      "http://52.78.195.183:3003/api/expenses/search?q=" +
      realSearchText +
      "&userId=ozazat";

    const response = await axios.get(url);
    console.log("response1", response);
    const data1 = response.data;
    ////split 이용해서 새로운 배열 
    console.log(data1); /// 요기 찍히게
    setSearchData(data1);
  };

  return (
    <div style={{ padding: 20 }}>
      검색
      <br />
      <SearchContainer>
        <SearchInput
          onChange={(e) => {
            setRealSearchText(e.target.value);
          }}
          value={realSearchText}
        />
        {realSearchText ? (
          <AutoSearchContainer>
            <AutoSearchWrap>
              {searchData.map((item, index) => (
                <AutoSearchData key={index}>
                  <div style={{ marginLeft: 10 }}>{item.category}</div>
                  
                </AutoSearchData>
              ))}
            </AutoSearchWrap>
          </AutoSearchContainer>
        ) : null}
      </SearchContainer>
    </div>
  );
};

export default Search;

