create table ec_config{
    config Text
};
INSERT INTO ec_config VALUES ('{"common":{"facebook":{"facebook_link":"https:\/\/www.facebook.com\/59Boutiques","facebook_name":"59 Boutiques"},"shop_intro":"<p>CCCCC<\/p>","banner":"\u0110\u1ea1i h\u1ea1 gi\u00e1 t\u1eeb 12-9 \u0111\u1ebfn 1-10","meta_description":"Qu\u1ea7n Jean cao c\u1ea5p","meta_keyword":"Qu\u1ea7n Jean, Qu\u1ea7n Jean Levis, Qu\u1ea7n Jean cao c\u1ea5p"},"product":{"shipping":"<p>Ch\u1ec9 chuy\u1ec3n trong tu\u1ea7n<\/p>","policy":"<p>1.<\/p><p>2.<\/p><p>3<\/p>","size_chart":"<figure class=\"table\"><table><tbody><tr><td>Size 37<\/td><td>100cm<\/td><td>100cm<\/td><td>100cm<\/td><\/tr><tr><td>Size 37<\/td><td>&nbsp;<\/td><td>&nbsp;<\/td><td>&nbsp;<\/td><\/tr><tr><td>Size 37<\/td><td>&nbsp;<\/td><td>&nbsp;<\/td><td>&nbsp;<\/td><\/tr><tr><td>Size 37<\/td><td>&nbsp;<\/td><td>&nbsp;<\/td><td>&nbsp;<\/td><\/tr><\/tbody><\/table><\/figure>","size_chart_note":"Note size chart"}}');
create table ec_user(
	id int AUTO_INCREMENT PRIMARY KEY,
    name varchar(150),
    username varchar(150),
    password Text,
    provider_id text null,
    phone varchar(17),
    address text,
    level int(3) DEFAULT 0,
    created_at timestamp,
    remember_token text
);
create table ec_category(
    id int AUTO_INCREMENT PRIMARY KEY,
    name varchar(100),
    parent_id int,
    link varchar(100)
);
create table ec_product(
    id int AUTO_INCREMENT PRIMARY KEY,
    name varchar(150),
    product_code varchar(30),
    link text,
    price double,
    sale_price double DEFAULT 0,
    content text,
    description text,
    keyword text,
    view BIGINT DEFAULT 0,
    created_at timestamp
);
create table ec_size(
    id int AUTO_INCREMENT PRIMARY KEY,
    name varchar(20)
);
create table ec_img(
    id int AUTO_INCREMENT PRIMARY KEY,
    link text,
    product_id int,
    img_order int,
    FOREIGN KEY (product_id) REFERENCES ec_product(id)
);
create table ec_procat_relationship(
	product_id int,
    category_id int,
    FOREIGN KEY (product_id) REFERENCES ec_product(id),
    FOREIGN KEY (category_id) REFERENCES ec_category(id)
);
create table ec_prosize_relationship(
    product_id int,
    size_id int,
    amount int DEFAULT 0,
    FOREIGN KEY (product_id) REFERENCES ec_product(id),
    FOREIGN KEY (size_id) REFERENCES ec_size(id)
);