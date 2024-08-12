import styled from 'styled-components';
import BackButton from '@assets/memo/back-button.svg';
import AddTag from '@assets/memo/add-tag-icon.svg';
import DeleteTag from '@assets/memo/delete-tag-icon.svg';
import { useNavigate } from 'react-router-dom';
import {
  ButtonHTMLAttributes,
  MouseEvent,
  KeyboardEvent,
  useState
} from 'react';

export const WriteMemo = () => {
  // 제목
  const [title, setTitle] = useState<string>('');

  // 태그
  const [tags, setTags] = useState<string[]>([]);
  const [showTagInput, setShowTagInput] = useState<boolean>(false);
  const [newTag, setNewTag] = useState<string>('');
  const [editTagIndex, setEditTagIndex] = useState<number | null>(null);

  // 본문
  const [content, setContent] = useState<string>('');

  const navigate = useNavigate();

  const handleTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (newTag.trim() !== '') {
        if (editTagIndex !== null) {
          // 태그 수정
          const updatedTags = [...tags];
          updatedTags[editTagIndex] = newTag.trim();
          setTags(updatedTags);
          setEditTagIndex(null);
        } else {
          // 새 태그 추가
          setTags([...tags, newTag.trim()]);
        }
        setNewTag('');
        setShowTagInput(false);
      }
    }
  };

  // 태그 삭제
  const handleTagDelete = (e: MouseEvent, index: number) => {
    e.stopPropagation(); // 이벤트 전파 중단
    setTags(tags.filter((_, i) => i !== index));
  };

  // 태그 수정 활성화
  const handleEditTag = (index: number) => {
    setEditTagIndex(index);
    setNewTag(tags[index]);
  };

  const handleSubmit = () => {
    console.log('제목: ', title, title.length);
    console.log('본문: ', content, content.length);
    console.log('태그: ', tags, tags.length);
    navigate(`/memo`);
  };

  return (
    <Container>
      <MemoContainer>
        <TopContainer>
          <BackBtn onClick={() => navigate(-1)} />
          {/* 제목 */}
          <TitleContainer>
            <TitleInput
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={50}
              placeholder="제목을 입력해주세요"
              autoFocus
            />
          </TitleContainer>

          {/* 태그 */}
          <TagContainer>
            {tags.map((tag, index) => (
              <Tag key={index} onClick={() => handleEditTag(index)}>
                {editTagIndex === index ? (
                  <TagInput
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={handleTag}
                    maxLength={5}
                    autoFocus
                  />
                ) : (
                  <>
                    <span>{tag}</span>
                    <DeleteTagBtn onClick={(e) => handleTagDelete(e, index)} />
                  </>
                )}
              </Tag>
            ))}
            {showTagInput && editTagIndex === null && (
              <TagInput
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={handleTag}
                maxLength={5}
                autoFocus
              />
            )}
            {!showTagInput && editTagIndex === null && tags.length < 3 && (
              <AddTagBtn
                onClick={() => {
                  setShowTagInput(true);
                  setEditTagIndex(null);
                }}
              />
            )}
          </TagContainer>
        </TopContainer>

        {/* 내용 */}
        <BottomContainer>
          <ContentText
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={10000}
            placeholder="내용을 입력해주세요"
          />
          <SubmitBtn type="submit" onClick={handleSubmit}>
            메모 등록
          </SubmitBtn>
        </BottomContainer>
      </MemoContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 1280px;
  height: 820px;
  background: ${(props) => props.theme.colors.background};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MemoContainer = styled.div`
  width: 1094px;
  height: 638px;
  border-radius: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: white;
`;

const TopContainer = styled.div`
  width: 985px;
  height: 146px;
  display: flex;
  flex-direction: column;
  margin-bottom: 19px;
`;

const BackBtn = styled(BackButton)<ButtonHTMLAttributes<HTMLButtonElement>>`
  width: 36px;
  height: 36px;
  display: flex;
  align-self: flex-start;
  margin-bottom: 9px;
  padding: 0;
  cursor: pointer;
  border: none;
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 51px;
  display: flex;
  align-items: center;
`;

const TitleInput = styled.input`
  width: 100%;
  height: 27px;
  font-weight: 700;
  font-size: 18px;
  border: none;
  background: none;
`;

const TagContainer = styled.div`
  width: 100%;
  height: 49px;
  border-top: 0.8px solid ${(props) => props.theme.colors.lightGray};
  border-bottom: 0.8px solid ${(props) => props.theme.colors.lightGray};
  display: flex;
  align-items: center;
  gap: 7px;
`;

const Tag = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 5px 6px;
  border-radius: 3px;
  background: ${({ theme }) => theme.colors.background};
  color: ${(props) => props.theme.colors.mainBlue};
  font-size: 9px;
  font-weight: 500;
  line-height: 14px;
  cursor: pointer;
`;

const DeleteTagBtn = styled(DeleteTag)<ButtonHTMLAttributes<HTMLButtonElement>>`
  width: 19px;
  height: 19px;
  cursor: pointer;
`;

const TagInput = styled.input`
  width: 50px;
`;

const AddTagBtn = styled(AddTag)<ButtonHTMLAttributes<HTMLButtonElement>>`
  width: 24px;
  height: 24px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 3px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  cursor: pointer;
`;

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentText = styled.textarea`
  width: 985px;
  height: 347px;
  border: none;
  font-size: 15px;
  line-height: 23px;
`;

const SubmitBtn = styled.button`
  width: 157px;
  height: 36px;
  margin: 19px 0 0 auto;
  background: ${(props) => props.theme.colors.mainBlue};
  border-radius: 3px;
  border: none;
  color: white;
  font-weight: 700;
  font-size: 12px;
  line-height: 18px;
  cursor: pointer;
`;