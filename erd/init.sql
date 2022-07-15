SELECT version();

CREATE OR REPLACE FUNCTION to_latin_character(text)
  RETURNS text AS
$func$
SELECT lower(
  translate(
    $1,
    '¹²³ÀÁẢẠÂẤẦẨẬẪÃÄÅÆàáảạâấầẩẫậãäåæĀāĂẮẰẲẴẶăắằẳẵặĄąÇçĆćĈĉĊċČčĎďĐđÈÉẸÊẾỀỄỆËèéẹêềếễệëĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨÌÍỈỊÎÏìíỉịîïĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłÑñŃńŅņŇňŉŊŋÒÓỎỌÔỐỒỔỖỘỐỒỔỖỘƠỚỜỞỠỢÕÖòóỏọôốồổỗộơớờỡợởõöŌōŎŏŐőŒœØøŔŕŖŗŘřßŚśŜŝŞşŠšŢţŤťŦŧÙÚỦỤƯỪỨỬỮỰÛÜùúủụûưứừửữựüŨũŪūŬŭŮůŰűŲųŴŵÝýÿŶŷŸŹźŻżŽžёЁ',
    '123AAAAAAAAAAAAAAaaaaaaaaaaaaaaAaAAAAAAaaaaaaAaCcCcCcCcCcDdDdEEEEEEEEEeeeeeeeeeEeEeEeEeEeGgGgGgGgHhHhIIIIIIIiiiiiiiIiIiIiIiIiJjKkkLlLlLlLlLlNnNnNnNnnNnOOOOOOOOOOOOOOOOOOOOOOOooooooooooooooooooOoOoOoEeOoRrRrRrSSsSsSsSsTtTtTtUUUUUUUUUUUUuuuuuuuuuuuuUuUuUuUuUuUuWwYyyYyYZzZzZzеЕ'
  )
);
$func$ LANGUAGE sql IMMUTABLE;
COMMENT ON FUNCTION to_latin_character(text) IS 'Convert unicode character to latin character only';

-- User's login information --
CREATE TABLE users(
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
  username VARCHAR(128) NOT NULL UNIQUE,
  password TEXT NOT NULL,
  role INT NOT NULL,
  -- authorized columns --
  active BOOLEAN DEFAULT TRUE,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by INT,
  updated_at TIMESTAMP,
  deleted_by INT,
  deleted_at TIMESTAMP
);

-- User's information detailed --
CREATE TABLE user_details(
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
  fullname VARCHAR(2048) NOT NULL,
  gender VARCHAR(6),
  email  VARCHAR(1024) UNIQUE,
  phone_number VARCHAR(),
  user_id REFERENCES users(id),
  -- authorized columns --
  active BOOLEAN DEFAULT TRUE,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by INT,
  updated_at TIMESTAMP,
  deleted_by INT,
  deleted_at TIMESTAMP
);

-- Trainning histories of students --
CREATE TABLE training_history(
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
  student_id REFERENCES users(id) NOT NULL,
  mentor_id REFERENCES users(id) NOT NULL,
  trainning_date TIMESTAMP,

  -- One student only has one mentor at same trainning date --
  CONSTRAINT ankens_code_key UNIQUE (student_id, mentor_id, trainning_date)
)