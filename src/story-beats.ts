// Presentation metadata for existing, source-backed narrative text. These are
// editorial labels, not historical quotations or newly asserted facts.
export const storyBeats:Record<string,{circle:string[];underline:string[];decisions:{anchor:string;label:string}[];reveal?:{anchor:string;title:string}}> = {
 'ep-0001':{circle:['Đậu Vũ'],underline:['Người muốn thanh trừng đối thủ lại trở thành bên bị đánh bại.'],decisions:[]},
 'ep-0002':{circle:['Hoàng Phủ Tung'],underline:['hỏa công'],decisions:[{anchor:'Triều đình cử Hoàng Phủ Tung làm Tả trung lang tướng',label:'Bổ nhiệm'}]},
 'ep-0003':{circle:['Đổng Trác'],underline:['phế Hán Thiếu Đế'],decisions:[{anchor:'Hà Tiến gọi quân ngoài về kinh để xử lý hoạn quan.',label:'Triệu quân'},{anchor:'Đổng Trác đến kinh thành, nắm ảnh hưởng quân sự và thúc đẩy việc phế Hán Thiếu Đế',label:'Phế lập'}],reveal:{anchor:'Hãy nhìn cú đảo chiều này cho rõ.',title:'Mấu chốt của cú đảo chiều'}},
 'ep-0004':{circle:['Viên Thiệu'],underline:['nhà Đông Hán'],decisions:[{anchor:'Tháng giêng âm lịch năm 190, những lực lượng chống Đổng Trác tôn Viên Thiệu làm minh chủ.',label:'Lập minh chủ'}]},
 'ep-0005':{circle:['Lưu Ngu'],underline:[],decisions:[{anchor:'Nay Viên Thiệu và Hàn Phức đề nghị tôn Lưu Ngu',label:'Đề nghị tôn vua'}],reveal:{anchor:'Hãy nhìn vào tình thế lúc này.',title:'Ai nắm quyền tiếp tế?'}},
 'ep-0006':{circle:['Giả Hủ'],underline:[],decisions:[{anchor:'Vương Doãn cùng Sĩ Tôn Thụy bàn kế hoạch giết Đổng Trác.',label:'Bàn kế'}]}
};
