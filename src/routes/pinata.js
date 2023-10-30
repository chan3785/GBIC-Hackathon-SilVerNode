import axios from "axios";

const JWT = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4OWQ1Nzg4Yy1hZDk3LTRjYWEtYjc3NC03YWI4M2FiNWRiOGUiLCJlbWFpbCI6Inp6enpnZ2dnMDFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjNhYzdiMDc5ZTU1MTE3MjJiZDMyIiwic2NvcGVkS2V5U2VjcmV0IjoiNDgwY2U0NjI1ZTBlZTJjNjE2NmI4ZWU4YTIxMzliMzQ4NmNkZGRhNDE4OTdmNWQ1NjFhNzk0YzhiYjVkMGZkZCIsImlhdCI6MTY2MTUwNTU5Nn0.D9JZupSFA-3qrxMMRL02JtAdK-bWnNMpjLerKK3DZh8`;
//피나타 api키 nftmarket

//파일 IPFS에 업로드하는 함수
export const pinFileToIPFS = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("pinataOptions", '{"cidVersion": 1}');
  data.append(
    "pinataMetadata",
    '{"name": "MyFile", "keyvalues": {"company": "Pinata"}}'
  );

  const config = {
    method: "post",
    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
    headers: { Authorization: `Bearer ${JWT}` },
    data: data,
  };

  const res = await axios(config);

  return res.data;
};

//JSON IPFS에 업로드하는 함수
export const pinJSONToIPFS = async (json) => {
  console.log("pinJSONToIPFS 동작");
  const data = JSON.stringify({
    pinataOptions: {
      cidVersion: 1,
    },
    pinataMetadata: {
      name: "testing",
      keyvalues: {
        customKey: "customValue",
        customKey2: "customValue2",
      },
    },
    pinataContent: json,
  });

  const config = {
    method: "post",
    url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JWT}`,
    },
    data: data,
  };

  const res = await axios(config);

  return res.data;
};