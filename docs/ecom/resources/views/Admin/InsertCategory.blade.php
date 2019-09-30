@extends('AdminWidget')
@section('title','Thêm danh mục sản phẩm')
@section('banner','Thêm danh mục sản phẩm')
@section('content')

<div class="col-md-12">
	<div class="card card-user">
		<div class="card-header">
			<h5 class="card-title">Điền thông tin</h5>
		</div>
		<div class="card-body">
			<form action="{{url('quanly/danhmuc/them')}}" method="post">
				{{ csrf_field() }}
				<div class="row">
					<div class="col-12">
						<div class="form-group">
							<label>Tên danh mục</label>
							<input type="text" class="form-control" name="name" value="{{old('name')}}" placeholder="VD: Kaki..">
						</div>
					</div>
					<div class="col-sm-12 col-md-7 col-xl-7">
						<div class="form-group">
							<label for="exampleInputEmail1">Danh mục cha (Nếu không chọn gì, danh mục mới tạo sẽ là một danh mục cha mới)</label>
							<select class="form-control" name="parent_id">
								<option value="">------</option>
								@foreach($categories as $cat)
								<option value="{{$cat->id}}">{{$cat->name}}</option>
								@endforeach
							</select>
						</div>
					</div>
					<div class="col-sm-12 col-md-1 col-xl-1 mt-xl-3 mt-md-3 mt-sm-0 ml-sm-1">
						<button type="submit" class="btn btn-primary btn-round">Thêm danh mục</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>

@endsection