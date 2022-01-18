from django.shortcuts import render
from django.views.generic import ListView
from django.views import View
from django.http import JsonResponse
import json
from greeter_web.models import Name
from django.db.utils import IntegrityError


class Greeter(View):

    def get(self, request):
        return render(request, 'html/say_hello.html', {})

    def post(self, request):
        try:
            user_json = json.loads(request.body)
            name = Name.objects.create(first_name=user_json['first_name'].capitalize(),
                                       last_name=user_json['last_name'].capitalize(),
                                       email=user_json['email'])
        except IntegrityError as e:
            return JsonResponse({'error': str(e).split('\n')[0]}, status=409)
        except (KeyError, AttributeError, json.JSONDecodeError) as e:
            return JsonResponse({'error': str(e).split('\n')[0]}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e).split('\n')[0]}, status=500)
        return JsonResponse({'first_name': name.first_name,
                             'last_name': name.last_name,
                             'email': name.email}, status=200)


class NamesListView(ListView):
    template_name = 'html/names_list.html'
    queryset = Name.objects.all()
    paginate_by = 10